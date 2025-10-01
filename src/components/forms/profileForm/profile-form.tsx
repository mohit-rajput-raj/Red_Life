"use client";
import React from "react";
import ProfileFormProvider from "./profile-form-provider";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import ProfileFormUi from "./profile-form-ui";

type Props = {};

const ProfileForm = (props: Props) => {
  return (
    <>
      <ProfileFormProvider>
        <div className="card lg:card-side bg-base-100 shadow-sm flex rounded-md bg-zinc-800">
          <ProfileFormUi/>
        </div>
      </ProfileFormProvider>
    </>
  );
};

export default ProfileForm;
