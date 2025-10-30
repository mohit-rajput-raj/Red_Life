import { useFormHooksProvider } from "@/components/forms-hooks-provider.tsx/form-hooks-provider";
import { Loader } from "@/components/loader";
import { OccupationsFormsProvider } from "@/context/useOccupationsFormsContext";
import { useDoctorForm } from "@/hooks/profile/useDoctorForm";

import React from "react";
import { FormProvider } from "react-hook-form";

type Props = {
  children: React.ReactNode;
  occupation: string;
};

const OccupationFormProvider =(props: Props) => {
  const { methods, loading, onHandleSubmit } = useDoctorForm();

  return (
          <OccupationsFormsProvider>


    <FormProvider {...(methods)}>
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
