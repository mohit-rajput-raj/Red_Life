import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ErrorMessage } from "@hookform/error-message";
import React, { ChangeEvent, useState } from "react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Calendar22 } from "./data-picker";

type Props = {
  type: "text" | "email" | "password" | "date";
  inputType: "select" | "input" | "textarea" | "image" | "date";
  options?: { value: string; label: string }[];
  label?: string;
  placeholder: string;
  register: UseFormRegister<any>;
  name: string;
  errors: FieldErrors<FieldValues>;
  lines?: number;
  form?: string;
  defaultValue?: string;
  disabled?: boolean;
};

const FormGenerator = ({
  disabled,
  errors,
  inputType,
  name,
  placeholder,
  defaultValue,
  register,
  type,
  form,
  label,
  lines,
  options,
}: Props) => {
  const [preview, setPreview] = useState<string | null>(null);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  switch (inputType) {
    case "input":
    default:
      return (
        <Label
          className="flex flex-col gap-2"
          htmlFor={`input-${label ?? name}`}
        >
          {label && label}
          <Input
            className="dark:bg-white/30 bg-zinc-100/30"
            id={`input-${label ?? name}`}
            type={type}
            placeholder={placeholder}
            form={form}
            defaultValue={defaultValue}
            disabled={disabled}
            {...register(name)}
          />
          <ErrorMessage
            errors={errors}
            name={name}
            render={({ message }) => (
              <p className="text-red-400 mt-2">
                {message === "Required" ? "" : message}
              </p>
            )}
          />
        </Label>
      );
    case "select":
      return (
        <Label
          className="flex flex-col gap-2 "
          htmlFor={`select-${label ?? name}`}
        >
          {label && label}
          <select
          disabled={disabled}
            {...register(name)}
            className="w-full border rounded-md p-2"
          >
            <option value="">{`select ${label ?? name}s`}</option>
            {options &&
              options.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.label}
                </option>
              ))}
          </select>
          <ErrorMessage
            errors={errors}
            name={name}
            render={({ message }) => {
              if (message) toast.error("problem in select");
              return (
                <p className="text-red-400 mt-2">
                  {message === "Required" ? "" : message}
                </p>
              );
            }}
          />
        </Label>
      );
    case "textarea":
      return (
        <Label
          className="flex flex-col gap-2"
          htmlFor={`input-${label ?? name}`}
        >
          {label && label}
          <Textarea
            id={`input-${label ?? name}`}
            placeholder={placeholder}
            form={form}
            rows={lines}
            defaultValue={defaultValue}
            disabled={disabled}
            {...register(name)}
          />
          <ErrorMessage
            errors={errors}
            name={name}
            render={({ message }) => (
              <p className="text-red-400 mt-2">
                {message === "Required" ? "" : message}
              </p>
            )}
          />
        </Label>
      );

    case "date":
      return (
         <Label className="flex flex-col gap-2 p-2 mx-2 " htmlFor={`input-${label ?? name}`}>
        {label && label}
        <input
          id={`input-${label ?? name}`}
          type="date"
          {...register(name, { valueAsDate: true })}
          className="border rounded px-2 py-1"
          defaultValue={defaultValue}
        />
        <ErrorMessage
          errors={errors}
          name={name}
          render={({ message }) => (
            <p className="text-red-400 mt-2">
              {message === "Required" ? "" : message}
            </p>
          )}
        />
      </Label>
      );

    case "image":
      return (
        <div className="flex flex-col w-full ">
          <Input
            id={`input-${label ?? name}`}
            type="file"
            accept="image/*"
            className="dark:bg-white/30 bg-zinc-100/30 cursor-pointer"
            {...register(name)}
            onChange={(e) => {
              register(name).onChange(e);
              handleImageChange(e);
            }}
            disabled={disabled}
          />
          <ErrorMessage
            errors={errors}
            name={name}
            render={({ message }) => (
              <p className="text-red-400 mt-2">
                {message === "Required" ? "" : message}
              </p>
            )}
          />
          {preview && (
            <div className="w-full flex justify-center">
              <img
                src={preview}
                alt="Preview"
                className="mt-2 w-[200px] h-[200px] object-cover rounded-md border shadow-sm"
              />
            </div>
          )}
        </div>
      );
  }
};

export default FormGenerator;
