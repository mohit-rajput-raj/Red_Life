"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  
  CardHeader,
} from "@/components/ui/card";
import { useWorkFlowContext } from "@/providers/workFlow/work-flow-provider";
import { CircleFadingPlus } from "lucide-react";

export function CreateCard() {
  const {setFlows, flows} = useWorkFlowContext();
 
  return (
          <Button
            variant="link"
            onClick={() => setFlows(flows + 1)}
            className="h-10 min-w-[150px] flex items-center justify-center"
          >
    <Card className="h-full w-full max-w-sm">
      <CardHeader className="flex flex-col items-center justify-center h-full">
        {/* <CardTitle>create a workFlow</CardTitle> */}

        <CardAction className="flex flex-col items-center justify-center h-full w-full">
            <CircleFadingPlus />
        </CardAction>
      </CardHeader>
    </Card>
          </Button>
  );
}
