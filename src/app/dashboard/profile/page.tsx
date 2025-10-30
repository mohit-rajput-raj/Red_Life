"use client";
import { useQueryInstituteData } from "@/actions/queries/user-queries";
import AddressForm from "@/components/forms/addressForms/test-form";
import ProfileForm from "@/components/forms/profileForm/profile-form";
import UsersProfileData from "@/components/profile/usersdata-profile";
import { SkeletonCard } from "@/components/spinner/profile-skeleton";
import { OccupationsFormsProvider } from "@/context/useOccupationsFormsContext";
import { useusersdataHook } from "@/context/user-values-updations";
// import { Button } from '@/components/ui/button'
import React from "react";
// import { toast } from 'sonner'

type Props = {};

const Profile = (props: Props) => {
  const { usersData } = useusersdataHook();
   const {isRefetching} = useQueryInstituteData(usersData?.res?.user_id || 0);
   if(isRefetching) return <SkeletonCard/>
  return (
    <div className="flex flex-col gap-4">
        <ProfileForm />
      <AddressForm />
    </div>
  );
};

export default Profile;
