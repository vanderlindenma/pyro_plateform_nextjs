import React from "react";
import { Button } from "@/components/ui/button";
import { DashboardContext } from "../Dashboard";
import { useContext } from "react";
import { groupedEvent } from "@/actions/data/definitions";

const AlertList = () => {
  const { data } = useContext(DashboardContext);

  return (
    <div>
      <div
        className="xl:flex-col xl:h-full xl:w-64 xl:gap-y-2 xl:overflow-y-scroll xl:overflow-x-hidden
                 w-full h-fit flex flex-row items-center p-4 gap-x-2 gap-y-2 overflow-x-scroll overflow-y-hidden"
      >
        {data?.map((event) => (
          <AlertButton key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
};

const AlertButton = ({ event }: { event: groupedEvent }) => {
  const { selectedEventId, setSelectedEventId, setSelectedEvent, setImageId } =
    useContext(DashboardContext);

  return (
    <Button
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
  );
};

export default AlertList;
