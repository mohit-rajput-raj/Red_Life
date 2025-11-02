"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { LoaderFive } from "@/components/ui/loader";
import { useusersdataHook } from "@/context/user-values-updations";

function LoaderFiveDemo() {
  return <LoaderFive text="Generating Your Profile" />;
}

export default function AuthRedirectClient() {
  const router = useRouter();
  const { user, isLoaded: isUserLoaded } = useUser();
  const { usersData, isLoading, refetchUserData } = useusersdataHook();

  useEffect(() => {
    if (!isUserLoaded || isLoading) return;
    if (!user) {
      router.replace("/sign-in");
      return;
    }

    const type = user.publicMetadata?.user_type as string | undefined;

    if (!type) {
      refetchUserData?.(); 
      return;
    }

    if (type === "docs") router.replace("/dashboard");
    else if (type === "user") router.replace("/room");
    else router.replace("/setup"); 
  }, [isUserLoaded, isLoading, user, usersData]);

  return (
    <div className="h-screen w-full flex items-center justify-center bg-zinc-700">
      <LoaderFiveDemo />
    </div>
  );
}
