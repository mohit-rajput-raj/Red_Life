"use client";
import { use, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import React from "react";
import { LoaderFive } from "@/components/ui/loader";
import { useusersdataHook } from "@/context/user-values-updations";
import { is } from "date-fns/locale";
 
function LoaderFiveDemo() {
  return <LoaderFive text="Generating Your Profile" />;
}
export default function AuthRedirectClient() {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const { usersData, isLoading , refetchUserData} = useusersdataHook();
  
// const {usersData} = useusersdataHook();
  useEffect(() => {
    
    const handleRedirect =  () => {
      if (!isLoaded) return;
      if (!user) {
        router.replace("/sign-in");
      } else {
        
        
        
        const type = user.publicMetadata?.user_type as string | undefined;
        if (type === "docs") router.replace("/dashboard");
        if (type === "user") router.replace("/room");
      }
    };
    handleRedirect();
  }, [isLoaded, user]);

  return <div className="h-screen w-full flex items-center justify-center"><LoaderFiveDemo/></div>;
}
