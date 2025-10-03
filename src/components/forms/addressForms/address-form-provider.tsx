import { Loader } from "@/components/loader";
import { useUsersAddressForm } from "@/hooks/profile/users-addressForm";
import React from "react";
import { FormProvider } from "react-hook-form";

type Props = {
  children: React.ReactNode;
};

const AddressFormProvider = (props: Props) => {
  const { methods, loading, onHandleSubmit12 } =  useUsersAddressForm();


  return (
    <FormProvider {...methods}>
      <form onSubmit={onHandleSubmit12}>
        <div className="flex flex-col justify-between gap-3 h-full">
          <Loader loading={loading}>{props.children}</Loader>
        </div>
      </form>
    </FormProvider>
  );
};

export default AddressFormProvider;
