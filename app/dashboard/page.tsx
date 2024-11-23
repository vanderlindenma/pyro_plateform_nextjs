import { redirect } from "next/navigation";
import { getSession, logout } from "@/actions/auth/session";
import ClientDelayedRedirect from "./_components/ClientDelayedRedirect";
import Link from "next/link";
import { getUnacknowledgedEvents } from "@/actions/data/run_api_calls";
import { tryCatchExpectedError } from "@/lib/handle_expected_errors";
import Dashboard from "./_components/Dashboard";
import exampleUnacknowledgedEvents from "./example_unacknowledged_events.json";

export default async function DashboardPage() {
  const session = await tryCatchExpectedError(getSession, null);

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

  // const grouped_events = await getUnacknowledgedEvents();
  // return <Dashboard grouped_events={grouped_events} />;

  const grouped_events = JSON.stringify(exampleUnacknowledgedEvents);

  return <Dashboard grouped_events={grouped_events} />;
}
