"use client";
import React, { useEffect } from "react";
import ProfileFormProvider from "./profile-form-provider";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import ProfileFormUi from "./profile-form-ui";
import { EditProfileForm } from "@/components/anmetedUI/Overlays-animated";
import { useusersdataHook } from "@/context/user-values-updations";
// import { useQueryAutomation } from "@/hooks/queries/user-queries";
import { SkeletonCard } from "@/components/spinner/profile-skeleton";

type Props = {};

const ProfileForm = (props: Props) => {
//  console.log(usersData?.fullname, "usersData");
  const { usersData} = useusersdataHook();

// 
// const {} = useQueryAutomation()
//  if(!usersData) return <div>Loading...</div>
 

  return (
    <>
      <div className="card lg:card-side bg-base-100 shadow-sm flex rounded-md dark:bg-zinc-800 bg-slate-100">
        <div className="card-body w-full flex lg:flex-row flex-col items-center gap-4">
          {!usersData?<SkeletonCard/>:<>
          <div className="flex flex-col gap-4 p-4 dark:bg-zinc-750 w-full">
            <p className="text-zinc-400">{!usersData?"loading":usersData?.res?.fullname}</p>
            <input
              className="w-full max-w-sm px-4 py-2 text-gray-600 placeholder-gray-400 
             dark:bg-zinc-700   rounded-xl shadow-sm 
             focus:outline-none focus:ring-2 
             transition duration-200"
              type="phone"
              placeholder={!usersData?"loading":usersData?.res?.phone || "Phone Number"}
              disabled
            />
            <div className="w-[200px] h-5 rounded-sm">Birth date : {usersData?.res?.dob.toString().slice(0, 10)}</div>
            <input
              className="w-full max-w-sm px-4 py-2 text-gray-800 placeholder-gray-400 
             dark:bg-zinc-700   rounded-xl shadow-sm 
             focus:outline-none focus:ring-2 
             transition duration-200"
              type="gender"
              placeholder={usersData?.res?.gender || "Gender"}
              disabled
            />
             <button
              onClick={() => toast.success(usersData?.res?.phone || "nothing")}
            >
              click
            </button>
          </div>
          <div className="w-[200px] h-[200px] overflow-hidden rounded-md border ">
            <img
              className="h-full w-full  border  object-cover"
              src={
                usersData?.res?.profile_image ||
                "https://t4.ftcdn.net/jpg/02/60/04/09/360_F_260040900_oO6YW1sHTnKxby4GcjCvtypUCWjnQRg5.jpg"
              }
              alt="Album"
            />
           
          </div>

          <EditProfileForm usersData={usersData} /></>}
        </div>
      </div>
    </>
  );
};

export default ProfileForm;
