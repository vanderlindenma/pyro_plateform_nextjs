import React from "react";
import { useContext, useState, useEffect } from "react";
import { DashboardContext } from "../Dashboard";
import { DashboardContextType } from "@/app/dashboard/definitions";

const AlertDisplay = () => {
  console.log("AlertDisplay rendered");
  const { selectedEvent, imageId, showPrediction } = useContext(DashboardContext);
  const [isLoading, setIsLoading] = useState(true);
  // const [loadError, setLoadError] = useState(Array(selectedEvent?.media_urls.length).fill(false));
  const [currSelectedEvent, setCurrSelectedEvent] = useState<DashboardContextType['selectedEvent']>(selectedEvent);
  
  // const [currImageId, setCurrImageId] = useState<number>(0);
  // const [imageURL, setImageURL] = useState<string>(selectedEvent?.media_urls[0]);

  // if (imageId !== currImageId) {
  //   setCurrImageId(imageId);
  //   // setImageURL(selectedEvent?.media_urls[imageId]);
  // }

  if (selectedEvent?.id !== currSelectedEvent?.id) {
    console.log("selectedEvent changed");
    setCurrSelectedEvent(selectedEvent);
    // setImageURL(selectedEvent?.media_urls[imageId]);
    setIsLoading(true);
  }

  console.log("isLoading:", isLoading);

  return (
    <div>
      <div className={`${isLoading ? 'image-loading-screen-animation' : 'hidden'} flex items-center justify-center bg-gray-100 rounded-md w-full aspect-[1280/720]`}>
        <div className="flex flex-col items-center gap-2">
          <img src="/favicon.ico" alt="Loading" className="animate-pulse w-12 h-12" />
          <p className="text-gray-500">Images are loading...</p>
        </div>
      </div>
      { selectedEvent?.media_urls.map((url, index) => (
        <AlertImage 
          key={index}
          visible={imageId === index} 
          showPrediction={showPrediction} 
          isLoading={isLoading} 
          imageURL={url}
          predictionLoacalizations={selectedEvent.localizations[index]} 
          onLoad={index === 0 ? 
            () => {
              console.log("IMAGE ONLOAD")
              console.log(index)
              setIsLoading(false)} : 
            () => {}} 
        />
      ))}
    </div>
  );
};

const AlertImage = ({ visible, showPrediction, isLoading, imageURL, predictionLoacalizations, onLoad}: 
  { visible: boolean, showPrediction: boolean, isLoading: boolean, imageURL: string, predictionLoacalizations: number[], onLoad: () => void }) => {
  
    const [loadError, setLoadError] = useState(false);

    useEffect(() => {
      setLoadError(false);

      const preloadImage = new Image();
     
      preloadImage.onload = onLoad

      preloadImage.onerror = () => {
        setLoadError(true)
      }

      preloadImage.src = imageURL;
      // preloadImage.src = "coucou_gamin!";
      // preloadImage.src = Math.random() < 0.5 ? imageURL : "coucou_gamin!";
      
    }, [imageURL]);
  
    return (
    <div className={`${visible ? '' : 'hidden'}`}>
      <div className="relative">
      <img 
        src={imageURL}
        alt="Error loading image"
        className={`w-full h-auto rounded-md aspect-[1280/720] ${!loadError && !isLoading ? '' : 'hidden'}`}
      />
      {showPrediction && predictionLoacalizations && !isLoading && !loadError && (
            <PredictionRectangle localizations={predictionLoacalizations} />
          )}
      </div>
      <div className={`${loadError && !isLoading ? '' : 'hidden'} flex items-center justify-center bg-gray-100 rounded-md w-full aspect-[1280/720]`}>
        <div className="flex flex-col items-center gap-2">
          <svg width="60px" height="60px" viewBox="15 15 45 45">
            <path fill="#6B7280" strokeWidth="0.2" strokeLinejoin="round" d="M 27.9999,56L 17,56L 17,20L 59,20L 59,28L 49.9999,28.0001L 50,39L 38.9999,39.0001L 39,50L 38.9999,50.0001L 28,50L 27.9999,50.0001L 27.9999,56 Z M 37.9999,38.0001L 42.7499,38.0001L 45.9166,34.8334L 48.9998,37.9166L 48.9998,27.0002L 56,27L 56,23L 20,23L 20,53L 26.9999,53.0001L 26.9999,51L 24,51L 30.0833,44.3333L 33.25,47.5L 37.9999,42.7501L 37.9999,38.0001 Z M 30.9999,56.0001L 30.9999,53.0001L 41.9999,53.0001L 41.9999,42.0001L 42,42L 52.9999,42.0001L 53,42L 53,31L 59,31L 59,56L 30.9999,56.0001 Z M 42.9998,53.0001L 56,53L 56,32L 54,32L 54,51L 42.9998,51L 42.9998,53.0001 Z M 30.0833,26.9167C 30.0833,30.4145 27.2478,33.25 23.75,33.25C 23.2033,33.25 22.5061,33.1303 22,33L 22,25L 29.6666,25C 29.7968,25.5061 30.0833,26.37 30.0833,26.9167 Z "/>
          </svg>
          <p className="text-gray-500">Images could not be loaded</p>
        </div>
      </div>
    </div>
  );
};
const PredictionRectangle = ({localizations}: 
    { localizations: number[] }) => {
  return (
    <div
      className="absolute border-2 border-red-500"
      style={{
        left: `${localizations[0] * 100}%`,
        top: `${localizations[1] * 100}%`,
        width: `${localizations[2] * 100}%`,
        height: `${localizations[3] * 100}%`,
      }}
    />
  );
};

export default AlertDisplay;
