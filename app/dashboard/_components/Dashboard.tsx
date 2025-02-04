"use client";
// import { useQuery } from "@tanstack/react-query";
// import { getUnacknowledgedEvents } from "@/actions/data/run_api_calls";
import { groupedEventList, groupedEvent } from "@/actions/data/definitions";
import { useState, useEffect, createContext } from "react";
import AlertList from "./dashboard_components/AlertList";
import AlertDisplay from "./dashboard_components/AlertDisplay";
import ImageControls from "./dashboard_components/ImageControls";
import Header from "./dashboard_components/Header";
import {DashboardContextType } from "../definitions";


export const DashboardContext = createContext<DashboardContextType>({} as DashboardContextType);

export default function Dashboard(props: { example_data: groupedEventList }) {
  
  const example_data = props.example_data ?? [];

  // 
  // TODO: Replace example data with auto-refetched data from the API using approach below
  //
  // const { data, error } = useQuery<groupedEventList>({
  //   queryKey: ["unacknowledged_events"],
  //   queryFn: getUnacknowledgedEvents,
  //   refetchOnMount: true,
  //   refetchInterval: 5000, // Refetch every 5 seconds
  //   refetchIntervalInBackground: true, // Keep refetching even when the window is not focused
  // });

  const [selectedEventId, setSelectedEventId] = useState<number>(example_data[0].id);
  const [selectedEvent, setSelectedEvent] = useState<groupedEvent>(example_data[0]);
  const [imageId, setImageId] = useState<number>(0);
  const [showPrediction, setShowPrediction] = useState<boolean>(true);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

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
        data: example_data,
        selectedEventId: selectedEventId,
        setSelectedEventId: (id: number) => setSelectedEventId(id),
        selectedEvent: selectedEvent,
        setSelectedEvent: (event: groupedEvent) => setSelectedEvent(event),
        imageId: imageId,
        setImageId: (id: number) => setImageId(id),
        showPrediction: showPrediction,
        setShowPrediction: (show: boolean) => setShowPrediction(show),
        isPlaying: isPlaying,
        setIsPlaying: (playing: boolean) => setIsPlaying(playing),
      }}
    >
      <div className="h-full flex flex-col">
        <Header />
      <div className="xl:flex-row h-[calc(100%-3.5rem)] flex flex-col my-2 gap-x-2">
        <AlertList />
        <div className="xl:h-full xl:w-[calc(100%-16rem)] xl:p-0 p-2 flex flex-col gap-y-2">
          <AlertDisplay />
          <ImageControls />
        </div>
        <div className="h-full flex flex-col items-center w-64 p-4 gap-y-2 overflow-y-scroll bg-secondary">

        </div>
      </div>
      </div>
    </DashboardContext.Provider>
  );
}
