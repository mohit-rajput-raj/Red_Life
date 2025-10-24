"use client";

import { StaffFormSchems, StaffFormProps } from "@/schemas/institute.schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";


export const useWorkerForm = () => {
  const [loading, setLoading] = React.useState(false);

  const show = () => {
    console.log(methods.getValues());
  };
  const methods = useForm<StaffFormProps>({
    resolver: zodResolver( StaffFormSchems ),
    defaultValues: {
      institution_id: 1230,
      role: "Admin",
      staff_id : "123"
    },
    mode: "onChange",
  });


  const onHandleSubmit = methods.handleSubmit(async (data) => {
    try {
      setLoading(true);
      console.log("staff", data);
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
