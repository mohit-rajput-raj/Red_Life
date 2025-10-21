"use client";

import { StaffProps, StaffSchema } from "@/schemas/docs.schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
// import { uuidv4 } from "zod";

import { v4 as uuidv4 } from "uuid";

export const useDoctorForm = () => {
  const [key, setKey] = React.useState<string>(uuidv4().replace(/-/g, "").slice(0, 12));
  const [loading, setLoading] = React.useState(false);

  const show = () => {
    console.log(methods.getValues());
  };
  const methods = useForm<StaffProps>({
    resolver: zodResolver(StaffSchema),
    defaultValues: {
      role: "Doctor",
      key: key,
    },
    mode: "onChange",
  });
  const regenereateKey = () => {
   try {
      const newKey = uuidv4().replace(/-/g, "").slice(0, 12);
      setKey(newKey);
      methods.setValue("key", key);
    } catch (error) {
      console.error("Error generating key:", error);
    }
  };

  const onHandleSubmit = methods.handleSubmit(async (data) => {
    try {
      setLoading(true);
      console.log("tempo");
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
    regenereateKey,
    onHandleSubmit,
    show,
    ke:key
  };
};
