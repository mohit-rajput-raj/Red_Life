"use client";
import React, { Suspense, useEffect } from "react";
import { EditProfileForm } from "@/components/anmetedUI/Overlays-animated";

import { useusersdataHook } from "@/context/user-values-updations";
import { DrawerDialogDemo } from "./profile-setup-drawer";

import { Skeleton } from "@/components/ui/skeleton";
const OccupationFormProvider = React.lazy(
  () => import("./complete-occupation-form-provider")
);

type Props = {};

const ProfileForm = (props: Props) => {
  const { usersData } = useusersdataHook();
  const [occupation , setOccupation] = React.useState<string>("Doctor");

  return (
    <>
      <div className="card lg:card-side bg-base-100 shadow-sm flex flex-col p-3  rounded-md dark:bg-zinc-800 bg-slate-100 ">
        <div className="card-body w-full flex lg:flex-row flex-col items-center items-between">
          {!usersData ? (
            <SkeletonCard />
          ) : (
            <>
              <div className="flex flex-col gap-4 p-4 dark:bg-zinc-750 w-full">
                <p className="text-zinc-400">
                  {!usersData ? "loading" : usersData?.res?.fullname}
                </p>
                <input
                  className="w-full max-w-sm px-4 py-2 text-gray-600 placeholder-gray-400 
             dark:bg-zinc-700   rounded-xl shadow-sm dark:text-gray-500
             focus:outline-none focus:ring-2 
             transition duration-200"
                  type="phone"
                  placeholder={
                    !usersData
                      ? "loading"
                      : usersData?.res?.phone || "Phone Number"
                  }
                  disabled
                />
                <div className="w-[200px] h-5 rounded-sm dark:text-gray-500">
                  Birth date : {usersData?.res?.dob.toString().slice(0, 10)}
                </div>
                <input
                  className="w-full max-w-sm px-4 py-2 text-gray-800 placeholder-gray-400 
             dark:bg-zinc-700   rounded-xl shadow-sm  dark:text-gray-500
             focus:outline-none focus:ring-2 
             transition duration-200"
                  type="gender"
                  placeholder={usersData?.res?.gender || "Gender"}
                  disabled
                />
              </div>

              <div className="min-w-[300px] h-[400px] overflow-hidden rounded-md border p-5  ">
                <img
                  className="h-full w-full  border  object-cover rounded-sm"
                  src={
                    usersData?.res?.profile_image ||
                    "https://t4.ftcdn.net/jpg/02/60/04/09/360_F_260040900_oO6YW1sHTnKxby4GcjCvtypUCWjnQRg5.jpg"
                  }
                  alt="Album"
                />
              </div>

              {usersData?.res?.dob && <EditProfileForm usersData={usersData} />}
            </>
          )}
        </div>
        <div className="w-full flex gap-4 p-5 rounded-md dark:bg-zinc-900">
          {usersData && (
            <Suspense fallback={<SkeletonCard />}>
              {" "}
              <OccupationFormProvider occupation={occupation}>
                <DrawerDialogDemo usersData={usersData} occupation={occupation} setOccupation={setOccupation} />
              </OccupationFormProvider>
            </Suspense>
          )}
        </div>
      </div>
    </>
  );
};

export default ProfileForm;
export function SkeletonCard() {
  return (
    <div className="flex flex-col space-y-3">
      <Skeleton className="h-[125px] w-[250px] rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  );
}
