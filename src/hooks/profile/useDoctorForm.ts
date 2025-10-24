"use client";

import { useCompleteProfile } from "@/actions/auth";
import { useOccupationsFormsHooks } from "@/context/useOccupationsFormsContext";
import { useusersdataHook } from "@/context/user-values-updations";
import { DoctorFormSchems, DoctorFormProps } from "@/schemas/institute.schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import { toast } from "sonner";

export const useDoctorForm = (): {
  methods: UseFormReturn<DoctorFormProps>;
  show: () => void;
  loading: boolean;
  onHandleSubmit: (e?: any) => Promise<void>;
  selectInstituteId: (id: number) => void;
} => {
  const [loading, setLoading] = React.useState(false);
  const { setInstituteId, instituteId } = useOccupationsFormsHooks();
  const {usersData, refetchUserData} = useusersdataHook();
const show = () => {
  console.log(methods.watch());
}
  // ✅ Correct: call useForm directly at top level
  const methods = useForm<DoctorFormProps>({
    resolver: zodResolver(DoctorFormSchems),
    defaultValues: {
      doctor_id: usersData?.res?.user_id.toString() || "",
      specialization: "",
      institution_id: instituteId as number,
      identification_id: "",
    },
    mode: "onChange",
  });

  const selectInstituteId = (id: number) => {
    setInstituteId(id);
    methods.setValue("institution_id", id);
    console.log("set institution_id:", methods.getValues("institution_id"));
  };

  const onHandleSubmit = methods.handleSubmit(async (data) => {
    try {
      setLoading(true);
      console.log("doctor", data);
      const res =await useCompleteProfile(data);
      if(res?.status===200){
          refetchUserData();
      }
    } catch (error) {
      console.error("Profile update error:", error);
      toast.error("An error occurred while updating the profile.");
    } finally {
      setLoading(false);
    }
  });

  return { methods,show, loading, onHandleSubmit, selectInstituteId };
};
