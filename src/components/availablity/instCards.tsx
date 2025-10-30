import React, { use } from "react";
import { DirectionAwareHover } from "@/components/ui/direction-aware-hover";
import { ChartBarMixed } from "./card1";
import { ChartBarMultiple } from "./card2";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";


export function DirectionAwareHoverDemo() {
  const imageUrl =
    "https://images.unsplash.com/photo-1663765970236-f2acfde22237?q=80&w=3542&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
  return (
    <div className="h-[40rem] relative  flex items-center justify-center">
      <DirectionAwareHover imageUrl={imageUrl}>
        <p className="font-bold text-xl">In the mountains</p>
        <p className="font-normal text-sm">$1299 / night</p>
      </DirectionAwareHover>
    </div>
  );
}
type Props = {};

const InstCard = (props: Props) => {
    const router = useRouter();
  return (
   <>
  <div className="hidden lg:flex w-full mb-10">
    <DirectionAwareHoverDemo />
  </div>

  <div className="flex flex-col justify-center w-full">
    <div className="flex flex-col sm:flex-col md:flex-row justify-center gap-2 items-center">
      <ChartBarMultiple />
      <ChartBarMixed />
    </div>

    <Button
      variant="outline"
      className="mt-5 w-full"
      onClick={() => router.push(`/auth-redirect`)}
    >
      Apply
    </Button>
  </div>
</>

  );
};

export default InstCard;
