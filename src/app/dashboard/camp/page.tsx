import React from "react";
import WorkFlowList from "@/components/workFlow/workFlowSection/work-flow-list";
import { ScrollAreaHorizontal } from "@/components/workFlow/workspace_card/scroll-area";
import WorkFlowProvider from "@/providers/workFlow/work-flow-provider";
import { CreateMoreCamps } from "@/components/sdcn/drawer";
import { Button } from "@/components/ui/button";
import GenerateUsers from "./generateusers";

type Props = {};

const page = (props: Props) => {

  return (
    <div>
      <WorkFlowProvider>
        <div className="flex flex-col gap-2 h-full ">
          <div className="flex items-center gap-5 h-20">
            <CreateMoreCamps />

            <h1>create more camps</h1>
          </div>
          {/* <CreateCard/> */}
          <ScrollAreaHorizontal>
            <WorkFlowList />
          </ScrollAreaHorizontal>
        </div>
      </WorkFlowProvider>
      <div>
        pages of cards
      
        <GenerateUsers/>
      </div>
    </div>
  );
};

export default page;
