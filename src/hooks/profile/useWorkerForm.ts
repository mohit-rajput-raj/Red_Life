"use client";

import { CreateStaff } from "@/actions/staff-doctors";
import { useOccupationsFormsHooks } from "@/context/useOccupationsFormsContext";
import { useusersdataHook } from "@/context/user-values-updations";
import { StaffFormSchems, StaffFormProps } from "@/schemas/institute.schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";


export const useWorkerForm = () => {
  const [loading, setLoading] = React.useState(false);
   const { setInstituteId, instituteId } = useOccupationsFormsHooks();
  const { refetchUserData , usersData} = useusersdataHook();
  const show = () => {
    console.log(methods.getValues());
  };
  const methods = useForm<StaffFormProps>({
    resolver: zodResolver( StaffFormSchems ),
    defaultValues: {
      institution_id: instituteId || undefined,
      role: "Admin",
      staff_id :  usersData?.res?.user_id.toString() || "",
    },
    mode: "onChange",
  });


  const onHandleSubmit = methods.handleSubmit(async (data) => {
    try {
      setLoading(true);
      const res = await CreateStaff(data);
      if (res.status === 200) {
        refetchUserData();
        methods.reset();
        toast.success(res.message);
      }else{
        toast.error(res.message);
      }
    } catch (error) {
      console.error("Profile update error:", error);
      toast.error("An error occurred while updating the profile.");
    } finally {
      setLoading(false);
    }
  });

  return {
    methods,
    loading,
    onHandleSubmit,
    show,
  };
};
