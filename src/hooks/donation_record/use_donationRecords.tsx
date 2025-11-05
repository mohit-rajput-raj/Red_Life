import { insertDonationRecord } from "@/actions/auth/camps";
import { useDonationRecord, useQuerigetBloodGroup } from "@/actions/queries/user-queries";
import { DonationRecordProps, DonationRecordsSchema } from "@/schemas/donationRecordsForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export const useDonationRecords = ({ id, c }: { id: number; c: number }) => {
  const [loading, setLoading] = useState(false);
  const { refetch: donationRefetch } = useDonationRecord(c);
  const methods = useForm<DonationRecordProps>({
    resolver: zodResolver(DonationRecordsSchema),
    defaultValues: {
      person_id: "",
      recipient_id: "",
      camp_id: c,
      institution_id: id,
      blood_type: "",
      confirmBloodType:"",
      status: "done",
    },
    mode: "onChange",
  });

  const person = methods.watch("person_id");

  const { refetch: refetchBlood, isRefetching } = useQuerigetBloodGroup({
    id: Number(person),
  });

  useEffect(() => {
    if (!person) return;

    const fetchBlood = async () => {
      try {
        const result = await refetchBlood();
        const bloodType = result?.data;
        console.log(bloodType);
        methods.setValue("confirmBloodType", "fetching donars blood type...");
        
        if (bloodType) {
          const bt  = (bloodType as any)[0].blood_type ?? "";
          console.log(bt);
          
          methods.setValue("confirmBloodType", bt);
        }
      } catch (error) {
        console.error("Error fetching blood group:", error);
      }
    };

    const timer = setTimeout(fetchBlood, 2000);
    return () => clearTimeout(timer);
  }, [person, refetchBlood, methods]);

  const onHandleSubmit = methods.handleSubmit(async (data) => {
    try {
      setLoading(true);
      const res = await insertDonationRecord({ data });
      if (res?.status === 200) {
        toast.success(res?.message || "Donation record added successfully" + res?.res2 || "and inventory updated");
        methods.reset();
        donationRefetch();
      } else {
        toast.error(res?.message || "Failed to add record");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong while submitting donation record.");
    } finally {
      setLoading(false);
    }
  });

  return { loading, onHandleSubmit, methods, isRefetching };
};
