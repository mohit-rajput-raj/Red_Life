"use client";

import { FillUserProfile, GetUserByClerkId } from "@/actions/auth";
import { usersdata, UsersData } from "@/types/pgType";
import { useUser } from "@clerk/nextjs";
import React, { createContext, useContext, ReactNode } from "react";
import { toast } from "sonner";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {  useQueryUsersData } from "@/hooks/queries/user-queries";

type AuthContextType = {
  usersData: UsersData | null;
  refetchUserData: () => void;
  UpdateUsersTable: (data: usersdata) => Promise<any>;
  isLoading: boolean;
  updateLoading: boolean;
};

const AuthContext = createContext<AuthContextType>({
  usersData: null,
  refetchUserData: () => {},
  UpdateUsersTable: async () => {},
  isLoading: false,
  updateLoading: false,
});

export const UserValuesProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useUser();
  const queryClient = useQueryClient();
  const [updateLoading, setUpdateLoading] = React.useState(false);

const {data: usersData, refetch: refetchUserData, isLoading} = useQueryUsersData(user?.id || "");
// const t 

  const UpdateUsersTable = async (data: usersdata) => {
    setUpdateLoading(true);
    try {
      let imageUrl: string | undefined;

      if (data.profile_image?.length) {
        const formData = new FormData();
        formData.append("file", data.profile_image[0]);
        const res = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });
        const json = await res.json();
        if (!res.ok) throw new Error(json.error || "Image upload failed");
        imageUrl = json.url;
      }

      const result = await FillUserProfile(
        data.phone,
        data.dob,
        data.gender,
        imageUrl || usersData?.res?.profile_image,
        user!.id
      );

      if (result.status === 200) {
        toast.success("Profile updated successfully!");
        refetchUserData();
      } else {
        toast.error(result.message || "Failed to update profile.");
      }
      return result;
    } catch (error) {
      console.error(error);
      toast.error("Failed to update user data");
    } finally {
      setUpdateLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        usersData: usersData && usersData.res ? usersData as UsersData : null,
        refetchUserData,
        UpdateUsersTable,
        isLoading,
        updateLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useusersdataHook = () => useContext(AuthContext);
