import React from "react";
import { useContext } from "react";
import { DashboardContext } from "../Dashboard";

const AlertDisplay = () => {
  const { selectedEvent, imageId, showPrediction } =
    useContext(DashboardContext);

  return (
    <div>
      {selectedEvent?.media_urls.map((url, index) => (
        <div
          key={`image_container_${index}`}
          className={`relative ${index === imageId ? "" : "hidden"}`}
        >
          <AlertImage index={index} url={url} />
          {showPrediction && selectedEvent.localizations[index] && (
            <PredictionRectangle index={index} />
          )}
        </div>
      ))}
    </div>
  );
};

const AlertImage = ({ index, url }) => {
  return (
    <img
      key={`image_${index}`}
      src={url}
      alt={`Event media ${index}`}
      className="w-full h-auto rounded-md"
    />
  );
};

const PredictionRectangle = ({ index }) => {
  const { selectedEvent } = useContext(DashboardContext);

  return (
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
  );
};

export default AlertDisplay;
