// import { useProfileForm } from "@/hooks/profile/use-profile";
import { Loader } from "@/components/loader";
import { useUsersProfileForm } from "@/hooks/profile/use-profile";
import React, { use } from "react";
import { FormProvider } from "react-hook-form";

type Props = {
  children: React.ReactNode;
};

const ProfileFormProvider = (props: Props) => {
  const {methods, loading , onHandleSubmit} = useUsersProfileForm()
  return (
    <div>
      <FormProvider {...methods}>

      <form onSubmit={onHandleSubmit}><div className="flex flex-col justify-between gap-3 h-full">
                  <Loader loading={loading}>{props.children}</Loader>
                </div></form>
      </FormProvider>
    </div>
  );
};

export default ProfileFormProvider;
