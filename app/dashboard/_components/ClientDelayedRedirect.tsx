"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

type Props = {
  destination?: string;
  delay?: number;
};

const ClientDelayedRedirect: React.FC<Props> = ({
  destination = "/",
  delay = 2000,
}) => {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push(destination);
    }, delay);

    return () => clearTimeout(timer); // Cleanup on unmount
  }, [router]);

  return null;
};

export default ClientDelayedRedirect;
