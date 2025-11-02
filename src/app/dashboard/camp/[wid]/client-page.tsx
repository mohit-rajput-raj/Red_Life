"use client";
// import { DataTableDemo } from "";
const DataTableDemo = dynamic(()=>import("@/components/datatable/data-table").then(mod=>mod.DataTableDemo),{ssr:false})

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { useDonationRecord, useGetAllCampWorkFlow, useGetCampData, useQueryInstituteData } from "@/actions/queries/user-queries";
import { SkeletonCard } from "@/components/spinner/profile-skeleton";
import { useusersdataHook } from "@/context/user-values-updations";
import React, { useCallback, useMemo, useState } from "react";
import { generateAddress, generateUsers } from "./generating_usrs";
import { generatDonationsRecors } from "./generate_blood-records";
const ChartRadarDots = dynamic(() => import("./rader-chart").then(mod => mod.ChartRadarDots), { ssr: false })
const ChartAreaInteractive = dynamic(() => import("./camp-chart-wave").then(mod => mod.ChartAreaInteractive), { ssr: false })
import { DonationFormProvider } from "@/components/forms/donationrecord/use_donation";
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
const {data:instituteData} = useQueryInstituteData(usersData?.res?.user_id || 0);
  if (isWorkflowLoading || isCampLoading || isRefetching ||drRefatching || isDonationLoading ) {
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
          <CampValues instituteData={instituteData} id={id} data={campData} loading={loading} setLoading={setLoading} donationRefetch={donationRefetch}/>
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


export const CampValues = ({instituteData,id,data, loading ,setLoading,donationRefetch}: {instituteData: any,id:number,data: any , loading:boolean, setLoading:React.Dispatch<React.SetStateAction<boolean>>,donationRefetch:()=>{}}) => {
  

const handelGenerating = useCallback(async () => {

  try {
    setLoading(true);
    console.log(instituteData?.res[0].institution_id);

    
  await generatDonationsRecors ({id, iid: instituteData?.res[0].institution_id,data  });
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
              <CardTitle>Camp</CardTitle>
              <CardDescription>
                {data?.res?.about}
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              <DonationFormProvider>
              <FieldFieldset/>
              </DonationFormProvider>
                {loading?<><div>...loading</div></>:<button onClick={handelGenerating}>insert random 500 donationrecords</button>}

            </CardContent>
            <CardFooter>
            </CardFooter>
          </Card>
  );
}
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field"
import dynamic from "next/dynamic";

export function FieldFieldset() {
  return (
    <div className="w-full max-w-md space-y-6">
      <FieldSet>
        <FieldLegend>Donar Information</FieldLegend>
        <FieldDescription>
          fill require informations
        </FieldDescription>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="street">Street Address</FieldLabel>
            <Input id="street" type="text" placeholder="123 Main St" className="border-gray-400" />
          </Field>
          <div className="grid grid-cols-2 gap-4">
            <Field>
              <FieldLabel htmlFor="city">City</FieldLabel>
              <Input id="city" type="text" placeholder="New York" className="border-gray-400" />
            </Field>
            <Field>
              <FieldLabel htmlFor="zip">Postal Code</FieldLabel>
              <Input id="zip" type="text" placeholder="90502" className="border-gray-400" />
            </Field>
          </div>
        </FieldGroup>
      </FieldSet>
    </div>
  )
}
