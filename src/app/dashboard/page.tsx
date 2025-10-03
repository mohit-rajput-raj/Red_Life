'use client';
// import { DrawerDemo } from "@/components/sdcn/drawer";
import { useusersdataHook } from "@/context/user-values-updations";
import React from "react";
import { toast } from "sonner";

// import {useUser} from '@clerk/nextjs'
type Props = {};

const page = (props: Props) => {
   const { usersData} = useusersdataHook();

  return (
    <div className="flex flex-col gap-3 h-auto w-full p-3">
      <header>
        <div className="dark:text-zinc-400">{!usersData?  "Loading...":usersData?.res?.fullname}</div>
      </header>
      

      
    </div>
  );
};

export default page;
