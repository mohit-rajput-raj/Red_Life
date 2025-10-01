"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";

export default function AuthRedirectClient() {
  const { user, isLoaded } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isLoaded) return;
    if (!user) {
      router.replace("/sign-in");
    } else {
      const type = user.publicMetadata?.user_type as string | undefined;
      if (type === "docs") router.replace("/dashboard");
      if (type === "user") router.replace("/room");
    }
  }, [isLoaded, user]);

  return <p>Loading...</p>;
}
