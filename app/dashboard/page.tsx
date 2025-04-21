import { getSession, logout } from "@/actions/auth/session";
import ClientDelayedRedirect from "./_components/ClientDelayedRedirect";
import Link from "next/link";
import { tryCatchExpectedError } from "@/lib/handle_expected_errors";
import Dashboard from "./_components/Dashboard";
import example_unacknowledged_events_ungrouped from "./example_unacknowledged_events_ungrouped.json";
import { groupEvents } from "@/actions/data/data_processing/process_api_results";
import QueryProvider from "./queryProvider";
import { Suspense } from "react";

export default async function DashboardPage() {
  // Skip session check
  // const session = await tryCatchExpectedError(getSession, null);
  // if (!session || !session.user) {
  //   return (
  //     <div>
  //       <p>You must be logged in to access the dashboard. </p>
  //       <p> You are being redirected to the login page</p>
  //       <Link href="/">Click here if you are not redirected</Link>
  //       <ClientDelayedRedirect delay={3000} destination={"/"} />
  //     </div>
  //   );
  // }

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
  const example_data = groupEvents(example_unacknowledged_events_ungrouped);

  return <Dashboard example_data={example_data} />;
}

function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center min-h-[200px]">
      Loading...
    </div>
  );
}
