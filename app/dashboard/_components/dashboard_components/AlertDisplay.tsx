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
  const [loadError, setLoadError] = React.useState(false);

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
      <div className={`${loadError && !isLoading ? '' : 'hidden'} flex items-center justify-center bg-gray-100 rounded-md w-full aspect-[1280/720]`}>
        <div className="flex flex-col items-center gap-2">
          <svg width="60px" height="60px" viewBox="15 15 45 45">
            <path fill="#6B7280" stroke-width="0.2" stroke-linejoin="round" d="M 27.9999,56L 17,56L 17,20L 59,20L 59,28L 49.9999,28.0001L 50,39L 38.9999,39.0001L 39,50L 38.9999,50.0001L 28,50L 27.9999,50.0001L 27.9999,56 Z M 37.9999,38.0001L 42.7499,38.0001L 45.9166,34.8334L 48.9998,37.9166L 48.9998,27.0002L 56,27L 56,23L 20,23L 20,53L 26.9999,53.0001L 26.9999,51L 24,51L 30.0833,44.3333L 33.25,47.5L 37.9999,42.7501L 37.9999,38.0001 Z M 30.9999,56.0001L 30.9999,53.0001L 41.9999,53.0001L 41.9999,42.0001L 42,42L 52.9999,42.0001L 53,42L 53,31L 59,31L 59,56L 30.9999,56.0001 Z M 42.9998,53.0001L 56,53L 56,32L 54,32L 54,51L 42.9998,51L 42.9998,53.0001 Z M 30.0833,26.9167C 30.0833,30.4145 27.2478,33.25 23.75,33.25C 23.2033,33.25 22.5061,33.1303 22,33L 22,25L 29.6666,25C 29.7968,25.5061 30.0833,26.37 30.0833,26.9167 Z "/>
          </svg>
          <p className="text-gray-500">Images could not be loaded</p>
        </div>
      </div>
      <img
        src={url}
        alt={`Event media ${index}`}
        className={`w-full h-auto rounded-md ${isLoading || loadError ? 'hidden' : ''}`}
        onLoad={onLoad}
        onError={() => {
          setLoadError(true);
          onLoad(); // Call onLoad to remove loading state
        }}
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
