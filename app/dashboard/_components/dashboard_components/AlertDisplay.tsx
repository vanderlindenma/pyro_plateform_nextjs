import React from "react";
import { useContext } from "react";
import { DashboardContext } from "../Dashboard";

const AlertDisplay = () => {
  const { selectedEvent, imageId, showPrediction } =
    useContext(DashboardContext);
  const [isLoading, setIsLoading] = React.useState(true);
  const [showLoadingUI, setShowLoadingUI] = React.useState(false);

  // Reset loading state when URL changes
  React.useEffect(() => {
    if (selectedEvent?.media_urls[imageId]) {
      setIsLoading(true);
      setShowLoadingUI(false);
      
      const loadingTimer = setTimeout(() => {
        setShowLoadingUI(true);
      }, 200);

      return () => clearTimeout(loadingTimer);
    }
  }, [selectedEvent?.media_urls[imageId]]);

  return (
    <div>
      {selectedEvent?.media_urls.map((url, index) => (
        <div
          key={`image_container_${index}`}
          className={`relative ${index === imageId ? "" : "hidden"}`}
        >
          <AlertImage 
            index={index} 
            url={url} 
            isLoading={isLoading}
            showLoadingUI={showLoadingUI}
            onLoad={() => setIsLoading(false)}
          />
          {showPrediction && selectedEvent.localizations[index] && !isLoading && (
            <PredictionRectangle index={index} />
          )}
        </div>
      ))}
    </div>
  );
};

const AlertImage = ({ 
  index, 
  url, 
  isLoading, 
  showLoadingUI, 
  onLoad 
}: { 
  index: number; 
  url: string;
  isLoading: boolean;
  showLoadingUI: boolean;
  onLoad: () => void;
}) => {
  return (
    <div className="relative">
      <div className={`${showLoadingUI || !isLoading ? 'hidden' : ''} flex items-center justify-center bg-gray-100 rounded-md w-full aspect-[1280/720]`}>
      </div>
      <div className={`${!showLoadingUI || !isLoading ? 'hidden' : ''} flex items-center justify-center bg-gray-100 rounded-md w-full aspect-[1280/720]`}>
        <div className="flex flex-col items-center gap-2">
          <img src="/favicon.ico" alt="Loading" className="animate-pulse w-12 h-12" />
          <p className="text-gray-500">Images are loading...</p>
        </div>
      </div>
      <img
        src={url}
        alt={`Event media ${index}`}
        className={`w-full h-auto rounded-md ${isLoading ? 'hidden' : ''}`}
        onLoad={onLoad}
      />
    </div>
  );
};

const PredictionRectangle = ({ index }: { index: number }) => {
  const { selectedEvent } = useContext(DashboardContext);

  return (
    <div
      key={`prediction_rectangle_${index}`}
      className="absolute border-2 border-red-500"
      style={{
        left: `${Number(selectedEvent.localizations[index][0]) * 100}%`,
        top: `${Number(selectedEvent.localizations[index][1]) * 100}%`,
        width: `${Number(selectedEvent.localizations[index][2]) * 100}%`,
        height: `${Number(selectedEvent.localizations[index][3]) * 100}%`,
      }}
    />
  );
};

export default AlertDisplay;
