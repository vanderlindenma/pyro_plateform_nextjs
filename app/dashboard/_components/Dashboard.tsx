"use client";
import { useQuery } from "@tanstack/react-query";
import { getUnacknowledgedEvents } from "@/actions/data/run_api_calls";
import { groupedEventList, groupedEvent } from "@/actions/data/definitions";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { CustomSlider } from "@/components/customSlider";
import {
  PlayIcon,
  PauseIcon,
  ArrowDownTrayIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/solid";

export default function Dashboard(props: { grouped_events: groupedEventList }) {
  let initialData = JSON.parse(props.grouped_events);

  // console.log(initialData);

  const { data, error } = useQuery<groupedEventList>({
    queryKey: ["unacknowledged_events"],
    queryFn: getUnacknowledgedEvents,
    initialData: initialData,
    refetchOnMount: false,
    // refetchInterval: 5000, // Refetch every 5 seconds
    // refetchIntervalInBackground: true, // Keep refetching even when the window is not focused
  });

  const [selectedEventId, setSelectedEventId] = useState<number>(data[0].id);
  const [selectedEvent, setSelectedEvent] = useState<groupedEvent>(data[0]);
  const [imageId, setImageId] = useState<number>(0);
  const [showPrediction, setShowPrediction] = useState<boolean>(true);

  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setImageId((prev) => (prev + 1) % selectedEvent?.media_urls.length);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, selectedEvent?.media_urls.length]);

  return (
    <div className="h-full flex flex-row gap-x-2">
      <div className="h-full flex flex-col items-center w-64 p-4 gap-y-2 overflow-y-scroll">
        {data?.map((event) => (
          <Button
            key={event.id}
            className="w-full h-fit"
            onClick={() => {
              setSelectedEventId(event.id);
              setSelectedEvent(event);
              setImageId(0);
            }}
            variant={event.id === selectedEventId ? "default" : "outline"}
          >
            <div className="flex flex-col items-center gap-y-2">
              <p className="font-bold">
                {event.device_login_display} - {event.device_azimuth}°
              </p>
              <p>{event.created_at_display}</p>
            </div>
          </Button>
        ))}
      </div>
      <div className="h-full flex flex-col gap-y-2 w-[calc(100%-16rem)]">
        {selectedEvent?.media_urls.map((url, index) => (
          <div
            key={`image_container_${index}`}
            className={`relative ${index === imageId ? "" : "hidden"}`}
          >
            <img
              key={`image_${index}`}
              src={url}
              alt={`Event media ${index}`}
              className="w-full h-auto rounded-md"
            />
            {showPrediction && selectedEvent.localizations[index] && (
              <div
                key={`prediction_rectangle_${index}`}
                className="absolute border-2 border-red-500"
                style={{
                  left: `${selectedEvent.localizations[index][0] * 100}%`,
                  top: `${selectedEvent.localizations[index][1] * 100}%`,
                  width: `${selectedEvent.localizations[index][2] * 100}%`,
                  height: `${selectedEvent.localizations[index][3] * 100}%`,
                }}
              />
            )}
          </div>
        ))}
        <div className="flex flex-row items-center justify-center gap-x-6">
          <div className="flex-1 flex flex-row items-center justify-center gap-x-2">
            <Button onClick={() => setIsPlaying(!isPlaying)} className="w-12">
              {isPlaying ? (
                <PauseIcon className="w-6 h-6" />
              ) : (
                <PlayIcon className="w-6 h-6" />
              )}
            </Button>
            <div className="flex-1 items-center relative">
              <CustomSlider
                className="w-full cursor-pointer"
                value={[imageId]}
                onValueChange={(value: number[]) => setImageId(value[0])}
                min={0}
                max={selectedEvent?.media_urls.length - 1}
                step={1}
              />
            </div>
          </div>
          <div className="flex flex-row gap-x-2">
            <Button
              variant={showPrediction ? "default" : "outline"}
              onClick={() => setShowPrediction(!showPrediction)}
            >
              <span>
                {showPrediction ? "Hide Prediction" : "Show Prediction"}
              </span>
              <span
                style={{ transform: "scaleY(1.5)" }}
                className={showPrediction ? "crossed-out" : ""}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5.25 7.5A2.25 2.25 0 0 1 7.5 5.25h9a2.25 2.25 0 0 1 2.25 2.25v9a2.25 2.25 0 0 1-2.25 2.25h-9a2.25 2.25 0 0 1-2.25-2.25v-9Z"
                  />
                </svg>
              </span>
            </Button>
            <Button
              onClick={() => {
                const link = document.createElement("a");
                link.href = selectedEvent?.media_urls[imageId];
                link.download = `event_media_${imageId}.jpg`;
                link.click();
              }}
            >
              Download Image
              <ArrowDownTrayIcon className="w-6 h-6" />
            </Button>
            <Button>
              Acknowledge Alert
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
            </Button>
          </div>
        </div>
      </div>

      <div className="h-full flex flex-col items-center w-64 p-4 gap-y-2 overflow-y-scroll bg-primary"></div>
    </div>
  );
}
