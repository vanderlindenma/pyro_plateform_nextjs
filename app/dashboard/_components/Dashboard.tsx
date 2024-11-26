"use client";
import { useQuery } from "@tanstack/react-query";
import { getUnacknowledgedEvents } from "@/actions/data/run_api_calls";
import { groupedEventList, groupedEvent } from "@/actions/data/definitions";
import { Button } from "@/components/ui/button";
import { useState, useEffect, createContext } from "react";
import Image from "next/image";
import Link from "next/link";
import { CustomSlider } from "@/components/customSlider";
import {
  PlayIcon,
  PauseIcon,
  ArrowDownTrayIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/solid";
import AlertList from "./dashboard_components/AlertList";
import AlertDisplay from "./dashboard_components/AlertDisplay";
import ImageControls from "./dashboard_components/ImageControls";

export const DashboardContext = createContext();

export default function Dashboard(props: { grouped_events: groupedEventList }) {
  let initialData = JSON.parse(props.grouped_events);

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
    <DashboardContext.Provider
      value={{
        data,
        selectedEventId,
        setSelectedEventId,
        selectedEvent,
        setSelectedEvent,
        imageId,
        setImageId,
        showPrediction,
        setShowPrediction,
        isPlaying,
        setIsPlaying,
      }}
    >
      <div className="xl:flex-row h-full flex flex-col gap-x-2">
        <AlertList />
        <div className="xl:h-full xl:w-[calc(100%-16rem)] flex flex-col gap-y-2">
          <AlertDisplay />
          <ImageControls />
        </div>
        <div className="h-full flex flex-col items-center w-64 p-4 gap-y-2 overflow-y-scroll bg-primary"></div>
      </div>
    </DashboardContext.Provider>
  );
}
