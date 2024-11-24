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
} from "@heroicons/react/24/solid";

export default function Dashboard(props: { grouped_events: groupedEventList }) {
  let initialData = JSON.parse(props.grouped_events).reverse();

  initialData.forEach((event) => {
    event.created_at_display = new Date(event.created_at).toLocaleString(
      "en-GB",
      {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }
    );
    event.device_login_display = event.device_login
      .replace(/_[^_]*$/, "")
      .replace(/_/g, " ");
  });
  //   props.grouped_events;
  //   JSON.parse(props.grouped_events);
  //   console.log(initialData);

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
                {event.device_login} - {event.device_azimuth}°
              </p>
              <p>{event.created_at_display}</p>
            </div>
          </Button>
        ))}
      </div>
      <div className="h-full flex flex-col gap-y-2 w-[calc(100%-16rem)]">
        {selectedEvent?.media_urls.map((url, index) =>
          index === imageId ? (
            <Image
              key={index}
              src={url}
              alt={`Event media ${index}`}
              className="w-full h-auto rounded-md"
              width={500}
              height={500}
              priority
            />
          ) : (
            <Image
              key={index}
              src={url}
              alt={`Event media ${index}`}
              className="w-full h-auto hidden"
              width={500}
              height={500}
              loading="eager"
            />
          )
        )}
        <div className="flex flex-row items-center justify-center">
          <Button
            onClick={() => setIsPlaying(!isPlaying)}
            className="mr-2 w-12"
          >
            {isPlaying ? (
              <PauseIcon className="w-6 h-6" />
            ) : (
              <PlayIcon className="w-6 h-6" />
            )}
          </Button>
          <div className="flex-1 items-center relative">
            <CustomSlider
              className="w-full"
              value={[imageId]}
              onValueChange={(value: number[]) => setImageId(value[0])}
              min={0}
              max={selectedEvent?.media_urls.length - 1}
              step={1}
            />
          </div>
          <Button
            onClick={() => {
              const link = document.createElement("a");
              link.href =
                (
                  document.querySelector(
                    `img[alt="Event media ${imageId}"]`
                  ) as HTMLImageElement
                )?.src || selectedEvent?.media_urls[imageId];
              link.download = `event_media_${imageId}.jpg`;
              // document.body.appendChild(link);
              link.click();
              // document.body.removeChild(link);
            }}
            className="ml-2"
          >
            Download Image
            <ArrowDownTrayIcon className="w-6 h-6" />
          </Button>
        </div>
      </div>

      <div className="h-full flex flex-col items-center w-64 p-4 gap-y-2 overflow-y-scroll bg-primary"></div>
    </div>
  );
}
