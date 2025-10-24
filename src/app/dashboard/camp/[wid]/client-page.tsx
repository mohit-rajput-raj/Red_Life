"use client";
import { DataTableDemo } from "@/components/datatable/data-table";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChartAreaInteractive } from "./camp-chart-wave";
import { ChartBarLabelCustom } from "./bar-chart";
import { ChartRadarDots } from "./rader-chart";
import { useGetCampData } from "@/actions/queries/user-queries";
import { SkeletonCard } from "@/components/spinner/profile-skeleton";

export const  WidPage= ({ id }: { id: number }) => {
  
  const {data, isLoading , isRefetching, refetch} = useGetCampData(id)
  if(isLoading || isRefetching){
    return <SkeletonCard/>
  }
  console.log(data?.res);
  
  return (
    <div>
      <Tabs defaultValue="all">
          <button onClick={() => refetch()}>reload</button>

        <TabsList>
          <TabsTrigger value="all">Donation camp details</TabsTrigger>
          <TabsTrigger value="donars">Donars</TabsTrigger>
          <TabsTrigger value="charts">Charts</TabsTrigger>
        </TabsList>
        <TabsContent value="donars">
          <div className="flex gap-2 items-center py-3 w-full">
            <h2>WID: {id}</h2>
            
          </div>
          <div className="flex flex-col gap-3 w-full">
            <DataTableDemo />
          </div>
        </TabsContent>
        <TabsContent value="all">
          <CampValues data={data}/>
        </TabsContent>
        <TabsContent value="charts">
          <div className="flex flex-col gap-5 p-3 w-full ">
            <div className="flex gap-5">
              <ChartBarLabelCustom />
              <ChartRadarDots />
            </div>
                          <ChartAreaInteractive />

            
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}


export const CampValues = ({data}: {data: any}) => {
  return (
    <Card>
            <CardHeader>
              <CardTitle>Password</CardTitle>
              <CardDescription>
                {data?.res?.about}
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="grid gap-3">
                <Label htmlFor="tabs-demo-current">Current password</Label>
                <Input id="tabs-demo-current" type="password" />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="tabs-demo-new">New password</Label>
                <Input id="tabs-demo-new" type="password" />
              </div>
            </CardContent>
            <CardFooter>
            </CardFooter>
          </Card>
  );
}
