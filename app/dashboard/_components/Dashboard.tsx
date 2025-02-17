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
  
  const default_event: groupedEvent = {
    id: -1,
    created_at: new Date().toISOString(),
    created_at_display: new Date().toLocaleString(),
    lat: 0,
    lon: 0,
    type: "empty",
    start_ts: null,
    end_ts: null,
    is_acknowledged: false,
    device_id: -1,
    alert_id: -1,
    device_login: "none",
    device_login_display: "None",
    device_azimuth: 0,
    media_urls: [],
    localizations: [],
  };

  const example_data: groupedEventList = props.example_data ?? [default_event];

  const [selectedEventId, setSelectedEventId] = useState<number>(example_data?.[0]?.id ?? default_event.id);
  const [selectedEvent, setSelectedEvent] = useState<groupedEvent>(example_data?.[0] ?? default_event);
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
        <div className={`${selectedEvent.id === -1 ? "" : "hidden"} 
                          xl:h-full xl:w-[calc(100%-16rem)] aspect-[1280/720] xl:p-0 p-2 flex flex-col items-center justify-center gap-y-2`}>
          <img
            src="/logo_yellow.png"
            alt="Pyronear Logo"
            width={400}
            height={400}
            className="mx-auto"
          />

          <div className="text-center">
            No alerts at the moment.
          </div>
          <div className="text-center">
            Alerts will appear in the left pannel when smoke is detected.
          </div>
        </div>
        <div className={`${selectedEvent.id === -1 ? "hidden" : ""} 
                          xl:h-full xl:w-[calc(100%-16rem)] xl:p-0 p-2 flex flex-col gap-y-2`}>
          <AlertDisplay />
          <ImageControls/>
        </div>
        <div className="xl:h-full xl:w-64 w-full flex flex-col items-center  p-4 gap-y-2 bg-secondary">
          PLACEHOLDER
        </div>
      </div>
      </div>
    </DashboardContext.Provider>
  );
}
