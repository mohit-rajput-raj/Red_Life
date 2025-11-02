"use client";

import {
  FillUserProfile,
  GetUserByClerkId,
  UpdateUsersAddress,
} from "@/actions/auth";
import {
  UsersAddessData,
  usersaddressdata,
  usersdata,
  UsersData,
} from "@/types/pgType";
import { useUser } from "@clerk/nextjs";
import React, { createContext, useContext, ReactNode, useState } from "react";
import { toast } from "sonner";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  useQuerieSimple,
  useQueryInstituteData,
  useQueryUsersAddress,
  useQueryUsersData,
} from "@/actions/queries/user-queries";
import { add } from "date-fns";

type AuthContextType = {
  usersData: UsersData | null;
  usersAddressData?: UsersAddessData | any;
  refetchUserData: () => void;
  addressRefatch?: () => void;
  UpdateUsersTable: (data: usersdata) => Promise<any>;
  UpdateUsersAddressTable: (data: usersaddressdata) => Promise<any>;
  
  isLoading: boolean;
  addressLoading?: boolean;
  updateLoading: boolean;
  InstituteData?: any;
  refetchInstituteData?: () => void;
  isInReafatch?: boolean;
  instituteLoading?: boolean;
  simplePerson?: any;
  simplePersonLoading?: boolean;
  simplePersonRefetch?: () => void;
  simplePersonRefetching?: boolean;
};

const AuthContext = createContext<AuthContextType>({
  usersData: null,
  usersAddressData: null,
  refetchUserData: () => {},
  addressRefatch: () => {},
  UpdateUsersTable: async () => {},
  UpdateUsersAddressTable: async () => {},
  isLoading: false,
  addressLoading: false,
  instituteLoading: false,
  updateLoading: false,
  InstituteData: null,
  isInReafatch: false,
  refetchInstituteData: () => {},
  simplePerson: null,
  simplePersonLoading: false,
  simplePersonRefetch: () => {},
  simplePersonRefetching: false,
});

export const UserValuesProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useUser();
  const queryClient = useQueryClient();
  const [updateLoading, setUpdateLoading] = React.useState(false);
  // const [userId , serUserID] = useState<number>(-1);

  const {
    data: usersData,
    refetch: refetchUserData,
    isRefetching: isRefetchingUsersData,
    isLoading,
  } = useQueryUsersData(user?.id || "");
  // if(!usersData ) {
  //   refetchUserData();
  // }
  setTimeout(() => {}, 2000);
      const {data:simplePerson, isLoading:simplePersonLoading , refetch:simplePersonRefetch , isRefetching:simplePersonRefetching } = useQuerieSimple({id:usersData?.res?.user_id || 0});
  
  const {
    data: usersAddressData,
    refetch: addressRefatch,
    isLoading: addressLoading,
  } = useQueryUsersAddress(usersData?.res?.address_id || 0);
  // const t
    const {data:InstituteData, refetch:refetchInstituteData, isLoading:instituteLoading , isRefetching:isInReafatch} =useQueryInstituteData(usersData?.res?.user_id);
  

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
  const UpdateUsersAddressTable = async (data: usersaddressdata) => {
    setUpdateLoading(true);
    try {
      const result = await UpdateUsersAddress(
        data,
        usersData?.res?.clerk_id || 0,
        usersData?.res?.address_id || 0
      );
      if (result?.status === 200) {
        toast.success("Address updated successfully!");
        addressRefatch();
      } else {
        toast.error(result?.message || "Failed to update address.");
      }
      return result;
    } catch (error) {
      console.error(error);
      toast.error("error in UpdateUsersAddress");
    } finally {
      setUpdateLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        simplePerson,
        simplePersonLoading,
        simplePersonRefetch,
        simplePersonRefetching,
        usersData: usersData && usersData.res ? (usersData as UsersData) : null,
        refetchUserData,
        UpdateUsersTable,
        UpdateUsersAddressTable,
        InstituteData,
        refetchInstituteData,
        instituteLoading,
        isLoading,
        isInReafatch,
        updateLoading,
        usersAddressData:
          usersAddressData && usersAddressData.res
            ? (usersAddressData as UsersAddessData)
            : null,
        addressRefatch,
        addressLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useusersdataHook = () => useContext(AuthContext);
