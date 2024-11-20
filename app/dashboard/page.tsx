import { redirect } from "next/navigation";
import { getSession, logout } from "@/actions/auth/session";
import ClientDelayedRedirect from "./_components/ClientDelayedRedirect";
import Link from "next/link";
import { getUnacknowledgedEvents } from "@/actions/data/run_api_calls";

export default async function DashboardPage() {
  const session = await getSession();

  if (!session || !session.user) {
    return (
      <div>
        <p>You must be logged in to access the dashboard. </p>
        <p> You are being redirected to the login page</p>
        <Link href="/">Click here if you are not redirected</Link>
        <ClientDelayedRedirect delay={3000} destination={"/"} />
      </div>
    );
  }

  const events = await getUnacknowledgedEvents();

  console.log(events);

  const grouped_events = events.reduce((acc, item) => {
    // If the ID does NOT already exists in the accumulator
    if (!acc[item.id]) {
      // Initialize the group with empty arrays for properties
      acc[item.id] = {
        id: item.id,
        created_at: item.created_at,
        lat: item.lat,
        lon: item.lon,
        type: item.type,
        start_ts: item.start_ts,
        end_ts: item.end_ts,
        is_acknowledged: item.is_acknowledged,
        device_id: item.device_id,
        alert_id: item.alert_id,
        device_login: item.device_login,
        device_azimuth: item.device_azimuth,
        media_urls: [],
        localizations: [],
      };
    }

    // Add the current item's properties to the respective arrays
    acc[item.id].media_urls.push(item.media_url);
    acc[item.id].localizations.push(item.localization);

    return acc;
  }, {});

  console.log(grouped_events);

  // return (
  return (
    <div>
      <h2>Unacknowledged Events</h2>
      <ul>
        {Object.values(grouped_events).map((event) => (
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
            <p>Media URLs: {event.media_urls.join(", ")}</p>
            <p>Localizations: {event.localizations.join(", ")}</p>
          </li>
        ))}
      </ul>
    </div>
  );
  //   <div>
  //     <form
  //       action={async () => {
  //         "use server";
  //         await logout();
  //         redirect("/");
  //       }}
  //     >
  //       <button type="submit">Logout</button>
  //     </form>
  //     <pre>{JSON.stringify(session, null, 2)}</pre>
  //   </div>
  // );
}
