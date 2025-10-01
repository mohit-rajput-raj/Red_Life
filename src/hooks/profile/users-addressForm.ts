'use client'

import { FillUserAddress } from "@/actions/auth";
import { CompleteUserAddressProps, CompleteUserAddressSchema } from "@/schemas/usersschemas";
import { useAuth } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";





export const useUsersAddressForm = () => {
    const [loading, setLoading] = useState(false);
    const methods = useForm<CompleteUserAddressProps>({
      resolver: zodResolver(CompleteUserAddressSchema),
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
        const result = await FillUserAddress(data.addressLine1, data.addressLine2 || null, data.district, data.city, data.state, data.country, data.postalCode, userId);
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
      onHandleSubmit,
    };
  };