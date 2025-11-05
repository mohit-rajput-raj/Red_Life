"use client";
import dynamic from "next/dynamic";
import React, { useCallback, useMemo, useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  useDonationRecord,
  useGetAllCampWorkFlow,
  useGetCampData,
  useQueryInstituteData,
} from "@/actions/queries/user-queries";
import { SkeletonCard } from "@/components/spinner/profile-skeleton";
import { useusersdataHook } from "@/context/user-values-updations";
import { generatDonationsRecors } from "./generate_blood-records";
import DonarFormProvider from "@/components/forms/donationrecord/donarFormprovider";
import FormGenerator from "@/components/forms/form-generatoe";
import { bloodTypes } from "@/components/forms/request/Request-form";
import { useFormContext } from "react-hook-form";
import { DonationRecordProps } from "@/schemas/donationRecordsForm";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { useDonationRecords } from "@/hooks/donation_record/use_donationRecords";

const DataTableDemo = dynamic(
  () =>
    import("@/components/datatable/data-table").then((m) => m.DataTableDemo),
  { ssr: false }
);
const ChartRadarDots = dynamic(
  () => import("./rader-chart").then((m) => m.ChartRadarDots),
  { ssr: false }
);
const ChartAreaInteractive = dynamic(
  () => import("./camp-chart-wave").then((m) => m.ChartAreaInteractive),
  { ssr: false }
);

export type BloodType = "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";

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
  const [loading, setLoading] = useState(false);
  const [donationR, setDonationR] = useState<DonationRecord[]>([]);
  const { usersData } = useusersdataHook();
  const userId = usersData?.res?.user_id ?? 0;

  const { data: workflowData, isLoading: isWorkflowLoading } =
    useGetAllCampWorkFlow(userId);
  const {
    data: campData,
    isLoading: isCampLoading,
    isRefetching,
    refetch,
  } = useGetCampData(id);
  const {
    data: donation_records,
    isRefetching: drRefatching,
    refetch: donationRefetch,
    isLoading: isDonationLoading,
  } = useDonationRecord(id);

  useEffect(() => {
    if (donation_records?.res) setDonationR(donation_records.res);
  }, [donation_records]);

  const validateAuth = useMemo(
    () => workflowData?.res?.some((item) => item.workflow_id === id),
    [workflowData, id]
  );

  const { data: instituteData } = useQueryInstituteData(userId);

  if (
    isWorkflowLoading ||
    isCampLoading ||
    isRefetching ||
    drRefatching ||
    isDonationLoading
  ) {
    return <SkeletonCard />;
  }

  if (!validateAuth) return <div>Unauthorized access</div>;

  return (
    <Tabs defaultValue="all">
      <button onClick={() => refetch()}>Reload</button>
      <TabsList>
        <TabsTrigger value="all">Donation Camp Details</TabsTrigger>
        <TabsTrigger value="donars">Donors</TabsTrigger>
        <TabsTrigger value="charts">Charts</TabsTrigger>
      </TabsList>

      <TabsContent value="donars">
        <DataTableDemo data={donationR} />
      </TabsContent>

      <TabsContent value="all">
        <CampValues
          instituteData={instituteData}
          id={id}
          data={campData}
          loading={loading}
          setLoading={setLoading}
          donationRefetch={donationRefetch}
        />
      </TabsContent>

      <TabsContent value="charts">
        <ChartAreaInteractive data={donation_records?.res} />
        <ChartRadarDots data={donation_records?.res} />
      </TabsContent>
    </Tabs>
  );
};

export const CampValues = ({
  instituteData,
  id,
  data,
  loading,
  setLoading,
  donationRefetch,
}: {
  instituteData: any;
  id: number;
  data: any;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  donationRefetch: () => void;
}) => {
  const handelGenerating = useCallback(async () => {
    try {
      setLoading(true);
      await generatDonationsRecors({
        id,
        iid: instituteData?.res?.[0]?.institution_id,
        data,
      });
      donationRefetch();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [id, instituteData, data, donationRefetch, setLoading]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Camp</CardTitle>
        <CardDescription>{data?.res?.about}</CardDescription>
      </CardHeader>
      <CardContent>
        <DonarFormProvider id={instituteData?.res?.[0]?.institution_id ?? 0} c={id}>
          <FieldFieldset
            id={instituteData?.res?.[0]?.institution_id ?? 0}
            c={id}
          />
        </DonarFormProvider>
        <div className="w-full flex justify-end">
          {loading ? (
          <div>...loading</div>
        ) : (
          <button onClick={handelGenerating}>
            insert random 500 donationrecords
          </button>
        )}
        </div>
      </CardContent>
    </Card>
  );
};

export function FieldFieldset({ id, c }: { id: number; c: number }) {
  const {
    register,
    formState: { errors },
  } = useFormContext<DonationRecordProps>();
const {isRefetching}= useDonationRecords({id , c});
  return (
    <div className="w-full max-w-md space-y-6">
      <FieldSet>
        <FieldLegend>Donor Information</FieldLegend>
        <FieldDescription>Fill required information</FieldDescription>
        <FieldGroup>
          {isRefetching?<div>...loading</div>:<FormGenerator
            name="blood_type"
            label="blood_type"
            placeholder="A+"
            
            type="text"
            inputType="select"
            options={bloodTypes}
            register={register}
            errors={errors}
          />}
          {isRefetching && <div>....fetching blood type</div>}
           <FormGenerator
              name="confirmBloodType"
              label="confirmBloodType"
              inputType="input"
              register={register}
              errors={errors}
              placeholder="confirmBloodType"
              type="text"
              disabled={true}
            />
          <div className="grid grid-cols-2 gap-4">
            <FormGenerator
              name="recipient_id"
              label="Recipient ID"
              inputType="input"
              register={register}
              errors={errors}
              placeholder="reciver id"
              type="text"
            />
             <FormGenerator
              name="person_id"
              placeholder="donar id"
              type="text"
              label="Donor ID"
              inputType="input"
              register={register}
              errors={errors}
              // onChange={(e) => console.log(e.target.value)}
            />
          </div>
          <button type="submit" className="w-20 h-6 rounded-md">
            done
          </button>
        </FieldGroup>
      </FieldSet>
    </div>
  );
}
