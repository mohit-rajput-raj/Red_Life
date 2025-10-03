'use client'

import { useusersdataHook } from "@/context/user-values-updations";
import { CompleteUserAddressProps, CompleteUserAddressSchema } from "@/schemas/usersschemas";
import { useAuth } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export const useUsersAddressForm = () => {
  const { UpdateUsersAddressTable } = useusersdataHook();
  const { userId, sessionId } = useAuth();
  const [loading, setLoading] = useState(false);

  const methods = useForm<CompleteUserAddressProps>({
    resolver: zodResolver(CompleteUserAddressSchema),
    defaultValues: {
      address_line1: "",
      address_line2: "",
      city: "",
      state: "",
      postal_code: "",
      country: ""
    },
    mode: "onChange",
  });

  const onHandleSubmit12 = methods.handleSubmit(async (data) => {
    console.log("tomato");
    
    try {
      setLoading(true);

      if (!userId || !sessionId) {
        console.error("User not authenticated");
        return;
      }

      console.log("✅ Submitting data:", data);

      const result = await UpdateUsersAddressTable({
        ...data,
        address_line2: data.address_line2 || "no values initialized",
      });

      if (result.success) {
        toast.success("Profile updated successfully!");
        methods.reset();
      } else {
        toast.error(result.message || "Failed to update profile.");
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
    onHandleSubmit12,
  };
};
