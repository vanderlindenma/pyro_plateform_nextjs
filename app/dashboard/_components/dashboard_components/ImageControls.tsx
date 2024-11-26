import React from "react";
import { Button } from "@/components/ui/button";
import { CustomSlider } from "@/components/customSlider";
import {
  ArrowDownTrayIcon,
  PauseIcon,
  PlayIcon,
} from "@heroicons/react/24/solid";
import { DashboardContext } from "../Dashboard";
import { useContext } from "react";

const ImageControls = () => {
  return (
    <div className="lg:flex-row flex flex-col items-center justify-center gap-x-6 gap-y-2">
      <div className="lg:flex-1 w-full flex items-center justify-center flex-row gap-x-2">
        <PlayPauseButton />
        <ImageSlider />
      </div>
      <div className="flex flex-row flex-wrap gap-y-2 gap-x-2">
        <PredictionButton />
        <DownloadButton />
        <AcknowledgeButton />
      </div>
    </div>
  );
};

const PlayPauseButton = () => {
  const { isPlaying, setIsPlaying } = useContext(DashboardContext);
  return (
    <Button
      onClick={() => setIsPlaying(!isPlaying)}
      className="w-12"
      variant={isPlaying ? "default" : "outline"}
    >
      {isPlaying ? (
        <PauseIcon className="w-6 h-6" />
      ) : (
        <PlayIcon className="w-6 h-6" />
      )}
    </Button>
  );
};

const ImageSlider = () => {
  const { selectedEvent, imageId, setImageId } = useContext(DashboardContext);

  return (
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
  );
};

const PredictionButton = () => {
  const { showPrediction, setShowPrediction } = useContext(DashboardContext);

  return (
    <Button
      variant={showPrediction ? "default" : "outline"}
      onClick={() => setShowPrediction(!showPrediction)}
    >
      <span>{showPrediction ? "Hide Prediction" : "Show Prediction"}</span>
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
  );
};

const DownloadButton = () => {
  const { selectedEvent, imageId } = useContext(DashboardContext);

  return (
    <Button
      onClick={() => {
        const link = document.createElement("a");
        link.href = selectedEvent?.media_urls[imageId];
        link.download = `event_media_${imageId}.jpg`;
        link.click();
      }}
      variant="outline"
    >
      Download Image
      <ArrowDownTrayIcon className="w-6 h-6" />
    </Button>
  );
};

const AcknowledgeButton = () => {
  return (
    <Button variant="outline">
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
  );
};

export default ImageControls;
