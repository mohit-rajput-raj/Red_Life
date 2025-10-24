"use client";
import AddressForm from "@/components/forms/addressForms/test-form";
import ProfileForm from "@/components/forms/profileForm/profile-form";
import UsersProfileData from "@/components/profile/usersdata-profile";
import { OccupationsFormsProvider } from "@/context/useOccupationsFormsContext";
// import { Button } from '@/components/ui/button'
import React from "react";
// import { toast } from 'sonner'

type Props = {};

const Profile = (props: Props) => {
  return (
    <div className="flex flex-col gap-4">
      <OccupationsFormsProvider>
        <ProfileForm />
      </OccupationsFormsProvider>
      <AddressForm />
    </div>
  );
};

export default Profile;
