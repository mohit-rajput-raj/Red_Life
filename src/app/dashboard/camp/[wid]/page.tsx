
import { DataTableDemo } from "@/components/datatable/data-table";

import { Button } from "@/components/ui/button";
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

interface PageProps {
  params: { role: string; wid: string };
}

export default async function WidPage({ params }: PageProps) {
  const routeParams = await Promise.resolve(params);

  return (
    <div>
      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">Donars</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
          <TabsTrigger value="charts">Charts</TabsTrigger>
        </TabsList>
        <TabsContent value="all">
          <div className="flex gap-2 items-center py-3 w-full">
            <h2>WID: {routeParams.wid}</h2>
            
          </div>
          <div className="flex flex-col gap-3 w-full">
            <DataTableDemo />
          </div>
        </TabsContent>
        <TabsContent value="password">
          <Card>
            <CardHeader>
              <CardTitle>Password</CardTitle>
              <CardDescription>
                Change your password here. After saving, you&apos;ll be logged
                out.
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
              <Button>Save password</Button>
            </CardFooter>
          </Card>
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
