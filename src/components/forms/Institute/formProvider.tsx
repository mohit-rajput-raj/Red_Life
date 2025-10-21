'use client'
import { Loader } from "@/components/loader";
import { useCreateInstitute } from "@/hooks/institute/use-institute";
import React from "react";
import { FormProvider } from "react-hook-form";

type Props = {
  children: React.ReactNode;
};

const InstituteFormProvider = (props: Props) => {
  const { methods, loading, onHandleSubmit, created } = useCreateInstitute();
  const { handleSubmit } = methods;

  const onSubmit = (data: any) => {
    return onHandleSubmit(data);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        <div className="flex flex-col justify-between gap-3 h-full w-full">
          {created?<div>your instute is created , </div>:<Loader loading={loading}>{props.children}</Loader>}
        </div>
      </form>
    </FormProvider>
  );
};

export default InstituteFormProvider;
