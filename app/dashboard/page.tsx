import { redirect } from "next/navigation";
import { getSession, logout } from "@/actions/auth/session";
import ClientDelayedRedirect from "./_components/ClientDelayedRedirect";
import Link from "next/link";
import { getUnacknowledgedEvents } from "@/actions/data/run_api_calls";
import { groupEvents } from "@/actions/data/data_processing/process_api_results";

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

  const grouped_events = groupEvents(events);

  console.log(grouped_events);

  // return (
  return (
    <div>
      <h2>Unacknowledged Events</h2>
      <ul>
        {grouped_events.map((event) => (
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
