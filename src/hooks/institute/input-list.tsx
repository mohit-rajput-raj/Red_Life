import React from "react";

type Props = {};
import { instituteForm } from "@/constants/forms";
import FormGenerator from "@/components/forms/form-generatoe";
import { useFormContext } from "react-hook-form";
import { CreateHospitalFormProps } from "@/schemas/institute.schemas";
import { useCreateInstitute } from "./use-institute";

const InputForm = (props: Props) => {
  const {
    register,
    formState: { errors },
  } = useFormContext<CreateHospitalFormProps >();
  const {methods} =useCreateInstitute();

  const [IntType , setType] = React.useState<string>(methods.getValues('type'));
const typefield = {
  id: '8',
  inputType: 'input' as const,  
  placeholder: IntType,  
  label: 'institute',
  name: 'type',
  type: 'text' as const, 
}


  return (
    <div className="flex flex-wrap gap-2">
      {instituteForm?.map((field) => (
        <FormGenerator
          key={field.id}
          {...field}
          errors={errors}
          register={register}
          name={field.name}
        />
      ))}
      <FormGenerator
      disabled
          key={typefield.id}
          {...typefield}
          errors={errors}
          register={register}
          name={typefield.name}
        />
    </div>
  );
};

export default InputForm;
