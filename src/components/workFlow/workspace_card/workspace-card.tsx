"use client";
import { SheetDemo } from "@/components/sdcn/sheet";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export function CardDemo({ id , status , pending,camp_id , step ,  serial}: {serial: number, id: string, camp_id:string, status:string , pending:string ,step:string}) {
  // const {flows} = useWorkFlowContext()
  return (
    <>
      {/* <Link href={`/dashboard/user/camp/${id}`} className="no-underline"> */}
      <Card className="flex flex-col justify-between min-h-[200px] min-w-[300px] max-w-[300px]  *:hover:first-letter:first-line:shadow-lg hover:scale-[1.02] transition-transform duration-200 ease-in-out">
        <Link href={`/dashboard/camp/${camp_id}`}>
          <CardHeader>
            {/* <CardTitle>workFlow serial no. {serial}</CardTitle> */}
            <CardDescription>workflow_id {id}</CardDescription>
            <p>{step}</p>
            <CardAction className="hover:bg-blue-200 dark:hover:bg-zinc-700 p-1 rounded-sm">
              {/* <Link href={`/dashboard/12233/${id}`}>add more</Link> */}
            </CardAction>
          </CardHeader>
        </Link>

        <CardFooter className="flex-col gap-2">
          <SheetDemo />
        </CardFooter>
      </Card>
      {/* </Link> */}
    </>
  );
}
