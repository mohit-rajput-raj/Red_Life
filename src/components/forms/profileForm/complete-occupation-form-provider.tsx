import { Loader } from "@/components/loader";
import { OccupationsFormsProvider } from "@/context/useOccupationsFormsContext";
import { useDoctorForm } from "@/hooks/profile/useDoctorForm";

import React from "react";
import { FormProvider } from "react-hook-form";
import { useOccupationFormProvider } from "./useOccupationFormProvider";
// import { useOccupationFormProvider } from "./useOccupationFormProvider";

type Props = {
  children: React.ReactNode;
  occupation: string;
};

const OccupationFormProvider =(props: Props) => {
  const result = useOccupationFormProvider({ occupation: props.occupation });
  
  if (result instanceof Error) {
    return <div>Error: {result.message}</div>;
  }

  const { methods, loading, onHandleSubmit } = result;

  return (
          <OccupationsFormsProvider>


    <FormProvider {...(methods as any)}>
      <form onSubmit={onHandleSubmit}>
        <div className="flex flex-col justify-between gap-3 h-full">
          <Loader loading={loading}>{props.children}</Loader>
        </div>
      </form>
    </FormProvider>
          </OccupationsFormsProvider>
  );
};

export default OccupationFormProvider;
