"use client";

import { FillUserProfile } from "@/actions/auth";
import { CompleteUserProps, CompleteUserSchema } from "@/schemas/usersschemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { useAuth } from "@clerk/nextjs";
import { toast } from "sonner";
export const useUsersProfileForm = () => {
  const [loading, setLoading] = useState(false);
  const methods = useForm<CompleteUserProps>({
    resolver: zodResolver(CompleteUserSchema),
    mode: "onChange",
  });
  const onHandleSubmit = methods.handleSubmit(async (data) => {
    try {
      setLoading(true);
      const { userId, sessionId } = useAuth();
      if (!userId || !sessionId) {
        console.error("User not authenticated");
        return;
      }
      const result = await FillUserProfile(data.phone, data.dob, data.gender, userId);
      if (result.status === 200) {
        toast.success("Profile updated successfully!");
        methods.reset();
      } else {
        toast.error(result.message || "Failed to update profile.");
      }
    } catch (error) {
        console.error("Profile update error:", error);
        toast.error("An error occurred while updating the profile.");
    }finally {
        setLoading(false);
    }
  });

  return {
    methods,
    loading,
    onHandleSubmit,
  };
};
