"use client";

export default function Dashboard(props) {
  console.log(props);

  const grouped_events = JSON.parse(props.grouped_events);

  console.log(grouped_events);

  return (
    <div>
      <h2>Unacknowledged Events</h2>
      <ul>
        {grouped_events?.map((event) => (
          <li key={event.id}>
            <p>ID: {event.id}</p>
            <p>Created At: {event.created_at}</p>
            <p>Latitude: {event.lat}</p>
            <p>Longitude: {event.lon}</p>
            <p>Type: {event.type}</p>
            <p>Start Timestamp: {event.start_ts}</p>
            <p>End Timestamp: {event.end_ts}</p>
            <p>Is Acknowledged: {event.is_acknowledged.toString()}</p>
            <p>Device ID: {event.device_id}</p>
            <p>Alert ID: {event.alert_id}</p>
            <p>Device Login: {event.device_login}</p>
            <p>Device Azimuth: {event.device_azimuth}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
