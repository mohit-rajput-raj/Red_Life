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

export function CardDemo({ id }: { id: string }) {
  // const {flows} = useWorkFlowContext()
  return (
    <>
      {/* <Link href={`/dashboard/user/camp/${id}`} className="no-underline"> */}
      <Card className="flex flex-col justify-between min-h-[200px] min-w-[300px] max-w-[300px]  *:hover:first-letter:first-line:shadow-lg hover:scale-[1.02] transition-transform duration-200 ease-in-out">
        <Link href={`/dashboard/camp/${id}`}>
          <CardHeader>
            <CardTitle>Login to your account</CardTitle>
            <CardDescription>card id {id}</CardDescription>
            <CardAction className="hover:bg-blue-200 dark:hover:bg-zinc-700 p-1 rounded-sm">
              {/* <Link href={`/dashboard/12233/${id}`}>add more</Link> */}
            </CardAction>
          </CardHeader>
        </Link>
        {/* <CardContent>
        <form>
        <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
              id="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <a
                href="#"
                className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                >
                Forgot your password?
                </a>
                </div>
                <Input id="password" type="password" required />
                </div>
                </div>
                </form>
                </CardContent> */}
        <CardFooter className="flex-col gap-2">
          <SheetDemo />
        </CardFooter>
      </Card>
      {/* </Link> */}
    </>
  );
}
