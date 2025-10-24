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
type SelectFieldsProps = {
  label?: string
  placeholder?: string
  options?: SelectOption[]
  defaultValue?: string
  disabled?: boolean
  selectInstituteId ?: (id: number) => void
  setOccupation?: React.Dispatch<React.SetStateAction<string>> 
}
export function Institutions(occupation: string) {
  const { methods, selectInstituteId } = useFormHooksProvider(occupation);
  const { institutes, isLoading, setInstituteId, instituteId } = useOccupationsFormsHooks();

  if (isLoading) return <div>Fetching Institutes.......</div>;

  const instituteOptions = institutes.map((inst) => ({
    value: String(inst.institution_id),  
    label: inst.name,  
    id: inst.institution_id,                 
  }));

  return (
    <div className="w-full max-w-md">
      <SelectFields2 
        options={instituteOptions}
        placeholder="Select Institute"
        label="Institute"
        selectInstituteId = {selectInstituteId}
        // setInstituteId={ setInstituteId}
      />
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
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value
    selectInstituteId (Number(value));
  console.log(Number(value));
  
    // if (setInstituteId) setInstituteId(Number(value))
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

