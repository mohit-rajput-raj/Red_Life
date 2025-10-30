"use client";

// import { FillUserProfile } from "@/actions/auth";
import { CompleteUserProps, CompleteUserSchema } from "@/schemas/usersschemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { toast } from "sonner";
import { useUser } from "@clerk/nextjs";
// import { FillUserProfile } from "@/actions/auth";
// import { useAuthContextHook } from "@/context/use-auth-context";
import { useusersdataHook } from "@/context/user-values-updations";
export const useUsersProfileForm = () => {

  const {UpdateUsersTable, usersData} = useusersdataHook();
      const { user } = useUser();

  const [loading, setLoading] = useState(false);
  const methods = useForm<CompleteUserProps>({
    resolver: zodResolver(CompleteUserSchema),
    defaultValues: {
      dob: typeof usersData?.res?.dob === "string" ? new Date(usersData.res.dob) : usersData?.res?.dob,
      gender: usersData?.res?.gender,
      phone: usersData?.res?.phone,
      profile_image:"",
    },
    mode: "onChange",
  });
  
  const onHandleSubmit = methods.handleSubmit(async (data) => {
    try {
      const res = await UpdateUsersTable(data);
      if(res.status===200){
        methods.reset();
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
  };
};
