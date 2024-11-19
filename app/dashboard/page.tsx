import { redirect } from "next/navigation";
import { getSession, logout } from "@/actions/auth/session";
import ClientDelayedRedirect from "./_components/ClientDelayedRedirect";
import Link from "next/link";

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

  return (
    <div>
      <form
        action={async () => {
          "use server";
          await logout();
          redirect("/");
        }}
      >
        <button type="submit">Logout</button>
      </form>
      <pre>{JSON.stringify(session, null, 2)}</pre>
    </div>
  );
}
