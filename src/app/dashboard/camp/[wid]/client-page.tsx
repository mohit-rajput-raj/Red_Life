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

import { useDonationRecord, useGetAllCampWorkFlow, useGetCampData } from "@/actions/queries/user-queries";
import { SkeletonCard } from "@/components/spinner/profile-skeleton";
import { useusersdataHook } from "@/context/user-values-updations";
import React, { useCallback, useMemo, useState } from "react";
import { generateAddress, generateUsers } from "./generating_usrs";
import { generatDonationsRecors } from "./generate_blood-records";
import { ChartRadarDots } from "./rader-chart";
import { ChartAreaInteractive } from "./camp-chart-wave";
import { DonationFormProvider } from "@/components/forms/donationrecord/use_donation";
// import { ChartLineInteractive } from "./linechart";
type BloodType = 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';

export interface DonationRecord {
  donation_id: number;
  person_id: number;
  recipient_id?: number | null;
  camp_id?: number | null;
  institution_id?: number | null;
  date: string;
  blood_type: BloodType;
  status: string;
}

export const WidPage = ({ id }: { id: number }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const { usersData } = useusersdataHook();
  const userId = usersData?.res?.user_id ?? 0;

  const { data: workflowData, isLoading: isWorkflowLoading } = useGetAllCampWorkFlow(userId);

  const { data: campData, isLoading: isCampLoading, isRefetching, refetch } = useGetCampData(id);
const {data:donation_records, isRefetching:drRefatching , refetch:donationRefetch , isLoading:isDonationLoading} = useDonationRecord(id);
const validateAuth = useMemo(() => workflowData?.res?.some(item => item.workflow_id === id), [workflowData, id]);

  if (isWorkflowLoading || isCampLoading || isRefetching ||drRefatching ) {
    return <SkeletonCard />;
  }

  if (!validateAuth) {
    return <div>Unauthorized access</div>;
  }
    console.log(donation_records?.res);
    

  return (
    <div>
      <Tabs defaultValue="all">
        <button onClick={() => refetch()}>Reload</button>
        <TabsList>
          <TabsTrigger value="all">Donation Camp Details</TabsTrigger>
          <TabsTrigger value="donars">Donors</TabsTrigger>
          <TabsTrigger value="charts">Charts</TabsTrigger>
        </TabsList>

        <TabsContent value="donars">
          <div className="flex gap-2 items-center py-3 w-full">
            <h2>WID: {id}</h2>
          </div>
          <div className="flex flex-col gap-3 w-full">
            <DataTableDemo  data={donation_records?.res} />
          </div>
        </TabsContent>

        <TabsContent value="all">
          <CampValues data={campData} loading={loading} setLoading={setLoading} donationRefetch={donationRefetch}/>
        </TabsContent>

        <TabsContent value="charts">
          <div className="flex flex-col gap-5 p-3 w-full">
            <ChartAreaInteractive data={donation_records?.res}/>
            <div className="flex gap-5">
              <ChartRadarDots data={donation_records?.res} />
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};


export const CampValues = ({data, loading ,setLoading,donationRefetch}: {data: any , loading:boolean, setLoading:React.Dispatch<React.SetStateAction<boolean>>,donationRefetch:()=>{}}) => {
  

const handelGenerating = useCallback(async () => {

  try {
    setLoading(true);
  await generatDonationsRecors ();
    donationRefetch();
  } catch (error) {
    console.log(error);
    
  }finally{
  setLoading(false);

  }
}, [generateUsers]);

  return (
    <Card>
            <CardHeader>
              <CardTitle>Password</CardTitle>
              <CardDescription>
                {data?.res?.about}
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              <DonationFormProvider>
              <div className="grid gap-3">
                <Label htmlFor="tabs-demo-current">Current password</Label>
                <Input id="tabs-demo-current" type="password" />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="tabs-demo-new">New password</Label>
                <Input id="tabs-demo-new" type="password" />
              </div>
              </DonationFormProvider>
                {loading?<><div>...loading</div></>:<button onClick={handelGenerating}>insert random 500 users</button>}

            </CardContent>
            <CardFooter>
            </CardFooter>
          </Card>
  );
}
