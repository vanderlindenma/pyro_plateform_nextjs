import { redirect } from "next/navigation";
import { getSession, logout } from "@/actions/auth/session";
import ClientDelayedRedirect from "./_components/ClientDelayedRedirect";
import Link from "next/link";
import { getUnacknowledgedEvents } from "@/actions/data/run_api_calls";
import { tryCatchExpectedError } from "@/lib/handle_expected_errors";
import Dashboard from "./_components/Dashboard";
import exampleUnacknowledgedEvents from "./example_unacknowledged_events.json";
import example_unacknowledged_events_ungrouped from "./example_unacknowledged_events_ungrouped.json";
import { groupEvents } from "@/actions/data/data_processing/process_api_results";
import QueryProvider from "./queryProvider";
import { Suspense } from "react";

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

  // const grouped_events = JSON.stringify([
  //   {
  //     id: 202030101020,
  //     created_at: "2024-11-23T16:09:26.355877",
  //     lat: 44.92757,
  //     lon: 4.84164,
  //     type: "wildfire",
  //     start_ts: "2024-11-23T16:09:26.354152",
  //     end_ts: null,
  //     is_acknowledged: false,
  //     devide_id: 72,
  //     alter_id: 88483,
  //     device_login: "st_peray_ptz_2",
  //     device_azimuth: 180,
  //   },
  //   {
  //     id: 120101010,
  //     created_at: "2024-11-23T16:09:26.355877",
  //     lat: 44.92757,
  //     lon: 4.84164,
  //     type: "wildfire",
  //     start_ts: "2024-11-23T16:09:26.354152",
  //     end_ts: null,
  //     is_acknowledged: false,
  //     devide_id: 72,
  //     alter_id: 88483,
  //     device_login: "st_peray_ptz_2",
  //     device_azimuth: 180,
  //   },
  // ]);

  return (
    <div className="h-full w-full">
      <QueryProvider>
        <Suspense fallback={<LoadingSpinner />}>
          <DashboardWithInitialData />
        </Suspense>
      </QueryProvider>
    </div>
  );
}

async function DashboardWithInitialData() {
  // const grouped_events = await getUnacknowledgedEvents();
  // const grouped_events = JSON.stringify(exampleUnacknowledgedEvents);
  const grouped_events = JSON.stringify(
    groupEvents(example_unacknowledged_events_ungrouped)
  );
  return <Dashboard grouped_events={grouped_events} />;
}

function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center min-h-[200px]">
      Loading...
    </div>
  );
}
