import {
  Field,
  FieldDescription,
  FieldLabel,
} from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useQueriesInstitutes } from "@/actions/queries/user-queries";
import React from "react";
import { useFormContext } from "react-hook-form";
import { InstitutionResponse, InstitutionItem } from "@/types/pgType";
import { useFormHooksProvider } from "../forms-hooks-provider.tsx/form-hooks-provider";
import { useOccupationsFormsHooks } from "@/context/useOccupationsFormsContext";
import { SelectFields } from "./occupation-selection";
import { id } from "date-fns/locale";
type SelectOption = {
  id: number
  value: string
  label: string
}
import { Label } from '@/components/ui/label'
import { useDoctorForm } from "@/hooks/profile/useDoctorForm";
import { DoctorFormProps } from "@/schemas/institute.schemas";
type SelectFieldsProps = {
  label?: string
  placeholder?: string
  options?: SelectOption[]
  defaultValue?: string
  disabled?: boolean
  selectInstituteId ?: (id: number) => void
  setOccupation?: React.Dispatch<React.SetStateAction<string>> 
}
export const Institutions =({occupation}:{occupation: string})=> {
  const { methods, selectInstituteId } = useDoctorForm();
  const { institutes, isLoading, setInstituteId, instituteId  , refetch  , isRefetching } = useOccupationsFormsHooks();

  if (isLoading) return <div>Fetching Institutes.......</div>;

  const instituteOptions = institutes.map((inst) => ({
    value: String(inst.institution_id),  
    label: inst.name,  
    id: inst.institution_id,                 
  }));

  return (
    <div className="w-full max-w-md ">
      <SelectFields2 
        options={instituteOptions}
        placeholder="Select Institute"
        label="Institute"
        selectInstituteId = {selectInstituteId}
        // setInstituteId={ setInstituteId}
      />
      {/* <button className="cursor-pointer dark:text-zinc-300" disabled={isRefetching} onClick={refetch}>refatch</button> */}
    </div>
  );
}
export function SelectFields2({
  disabled,
  label,
  placeholder,
  options = [],
  defaultValue = '',
  selectInstituteId = () => {},
}: SelectFieldsProps) {
  const { register , setValue , getValues } = useFormContext<DoctorFormProps>();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value
    // selectInstituteId (Number(value));
    setValue("institution_id", Number(value));
    console.log(getValues());
    
  
  }

  return (
    <Label className="flex flex-col gap-2" htmlFor={`select-${label ?? 'field'}`}>
      {label && <span>{label}</span>}
      <select
        id={`select-${label ?? 'field'}`}
        className="w-full border rounded-md p-2"
        disabled={disabled}
        defaultValue={defaultValue}
        onChange={handleChange}
      >
        <option value="">{placeholder ?? 'Select an option'}</option>
        {options.map((opt) => (
          <option key={opt.id} value={opt.id}>
            {opt.label}
          </option>
        ))}
      </select>
    </Label>
  )
}

