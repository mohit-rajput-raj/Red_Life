import { MovingBorderDemo } from "@/components/anmetedUI/moving-border.-button";
import { SheetDemo } from "@/components/sdcn/sheet";
import { Button } from "@/components/ui/button";
import WorkFlowList from "@/components/workFlow/workFlowSection/work-flow-list";
import { CreateCard } from "@/components/workFlow/workspace_card/create-card";
import { ScrollAreaHorizontal } from "@/components/workFlow/workspace_card/scroll-area";
// import { CardDemo } from '@/components/workFlow/workspace_card/workspace-card'
import WorkFlowProvider, {
  useWorkFlowContext,
} from "@/providers/workFlow/work-flow-provider";
import React, { use } from "react";

type Props = {
  children: React.ReactNode;
  params: { role: string; wid: string };
};

const layout = async (props: Props) => {
  const routeParams = await Promise.resolve(props.params);
  return (
    <div className="flex flex-col gap-4 h-[400px] pb-20 w-100%">
      {routeParams.role === "user" && (
        <WorkFlowProvider>
        <div className="flex flex-col gap-2 h-full w-screen">
          <div className="flex items-center gap-5 h-20">
            <CreateCard />
            <h1>create more camps</h1>
          </div>
          {/* <CreateCard/> */}
          <ScrollAreaHorizontal>
            <WorkFlowList />
          </ScrollAreaHorizontal>
        </div>
      </WorkFlowProvider>
      )}
      {routeParams.role === "admin" && (
        <div>admin</div>
      )}
      {props.children}
    </div>
  );
};

export default layout;
