"use client";

import { useCompleteProfile } from "@/actions/auth";
import { useOccupationsFormsHooks } from "@/context/useOccupationsFormsContext";
import { useusersdataHook } from "@/context/user-values-updations";
import { DoctorFormSchems, DoctorFormProps } from "@/schemas/institute.schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import { toast } from "sonner";

export const useDoctorForm = ()=> {
  const [loading, setLoading] = React.useState<boolean>(false);
  const { setInstituteId, instituteId } = useOccupationsFormsHooks();
  const {usersData, refetchUserData} = useusersdataHook();
const show = () => {
  console.log(methods.watch());
}
  const methods = useForm<DoctorFormProps>({
    resolver: zodResolver(DoctorFormSchems),
    defaultValues: {
      doctor_id: usersData?.res?.user_id.toString() || "",
      specialization: "surgen",
      institution_id: instituteId || undefined,
      identification_id: "",
    },
    mode: "onChange",
  });
  const  selectInstituteId = (id: number) => {
    setInstituteId(id);
    methods.setValue("institution_id", id);
    console.log(id , "rama rama" , methods.getValues());
    
  }
  

  const onHandleSubmit = methods.handleSubmit(async (data :DoctorFormProps) => {
    console.log(data);
    
    try {
      setLoading(true);
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

  return { methods,show, loading, onHandleSubmit , selectInstituteId };
};
