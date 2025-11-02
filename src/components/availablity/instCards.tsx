"use client";
import React, { use } from "react";
import { DirectionAwareHover } from "@/components/ui/direction-aware-hover";
import { ChartBarMixed } from "./card1";
import { ChartBarMultiple } from "./card2";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { ChartBarDefault } from "./card3";
import { SignedIn, SignIn } from "@clerk/nextjs";
import { useusersdataHook } from "@/context/user-values-updations";


export function DirectionAwareHoverDemo() {
  const imageUrl =
    "https://images.unsplash.com/photo-1663765970236-f2acfde22237?q=80&w=3542&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
  return (
    <div className="h-[25rem] relative  flex items-center justify-center">
      <DirectionAwareHover imageUrl={imageUrl}>
        <p className="font-bold text-xl">In the mountains</p>
        <p className="font-normal text-sm">$1299 / night</p>
      </DirectionAwareHover>
    </div>
  );
}


const InstCard = ({item , institute_id }:{item:any , institute_id:number }) => {
    const router = useRouter();
       const {usersData} = useusersdataHook();
    const [completed , setCompleted] = React.useState(usersData?.res?.is_profile_completed || false);
      if(!completed){
      return <div className='p-20'>Please complete your profile to view inventory <button onClick={() => router.push("/room/profile")}><b>complete profile</b></button></div>
    }
  return (
   <>
  <div className="hidden lg:flex w-full my-5">
    <DirectionAwareHoverDemo />
  </div>

  <div className="flex flex-col justify-center w-full">
    <div className="flex flex-col sm:flex-col md:flex-row justify-center gap-2 items-center">
      {/* <ChartBarMultiple  /> */}
      <div>
        <h2 className="text-2xl font-bold mb-2 text-center">Institute ID: {institute_id}</h2>
        <h3 className="text-lg font-semibold mb-4 text-center">Blood Inventory Overview</h3>
      </div>
      <ChartBarDefault item={item}/>
      {/* <ChartBarMixed item={item} /> */}
    </div>

   <SignedIn>
    <div className="flex justify-center mt-5">
      <Button
        onClick={() => router.push(`/room/bloodbank/${institute_id}`)}
        className="min-w-[150px]"
      >
        View Inventory
      </Button>
    </div>
   </SignedIn>
  </div>
</>

  );
};

export default InstCard;
