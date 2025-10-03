import React from "react";
import FormGenerator from "../forms/form-generatoe";
import { USER_PROFILE_FORM } from "@/constants/forms";
import { useFormContext } from "react-hook-form";
import { UsersData } from "@/types/pgType";

type Props = {
  phone: string;
  dob: string;
  gender: string;
  profileImage?: string;
  classname: string;
  UsersData: UsersData;
};

const UsersProfileData = (props: Props) => {
  const {
    register,
    formState: { errors },
    setValue,
  } = useFormContext();

  return (
    <div
      className={`p-4 border rounded-md *:bg-gray-800 flex-wrap w-full ${props.classname}`}
    >
      {USER_PROFILE_FORM.filter((_, index) => index !== 3).map((field) => (
        <FormGenerator
          key={field.id}
          {...field}
          errors={errors}
          register={register}
          name={field.name}
         
        />
      ))}
    </div>
  );
};

export default UsersProfileData;
