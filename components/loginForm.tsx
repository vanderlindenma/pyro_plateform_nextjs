"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { login } from "@/actions/auth/session";
import { useActionState } from "react";

export default function LoginPage() {
  const [state, action, pending] = useActionState(login, undefined);

  return (
    <form action={action}>
      <div className="flex flex-col gap-1">
        <div>
          <Label htmlFor="email">Username</Label>
          <Input id="username" name="username" placeholder="m@example.com" />
          {state?.errors?.username && (
            <p className="text-sm text-red-500">{state.errors.username}</p>
          )}
        </div>
        <div className="mt-4">
            <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" name="password" />
          {state?.errors?.password && (
            <p className="text-sm text-red-500">{state.errors.password}</p>
          )}
        </div>
        {state?.message && (
          <p className="text-sm text-red-500">{state.message}</p>
        )}
        <Button type="submit" className="mt-4 w-full">
          {pending ? "Submitting..." : "Login"}
        </Button>
      </div>
    </form>
  );
}
