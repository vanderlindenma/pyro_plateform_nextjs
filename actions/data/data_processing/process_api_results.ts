import { EventList, groupedEventList } from "../definitions";

export const groupEvents = (events: EventList): groupedEventList => {
  if (!events) return [];
  const grouped_labelled_events = events.reduce(
    (acc: { [key: number]: any }, event) => {
      // If the ID does NOT already exists in the accumulator
      if (!acc[event.id]) {
        // Initialize the group with empty arrays for properties
        acc[event.id] = {
          id: event.id,
          created_at: event.created_at,
          created_at_display: new Date(event.created_at).toLocaleString(
            "en-GB",
            {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
            }
          ),
          lat: event.lat,
          lon: event.lon,
          type: event.type,
          start_ts: event.start_ts,
          end_ts: event.end_ts,
          is_acknowledged: event.is_acknowledged,
          device_id: event.device_id,
          alert_id: event.alert_id,
          device_login: event.device_login,
          device_login_display: event.device_login
            .replace(/_[^_]*$/, "")
            .replace(/_/g, " "),
          device_azimuth: event.device_azimuth,
          media_urls: [],
          localizations: [],
        };
      }

      // Else, add the current item's properties to the respective arrays
      acc[event.id].media_urls.push(event.media_url);
      acc[event.id].localizations.push(event.localization);

      return acc;
    },
    {}
  );

  return Object.values(grouped_labelled_events).reverse();
};
