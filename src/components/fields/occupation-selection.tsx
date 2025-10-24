import React from 'react'
import { Label } from '@/components/ui/label'
import { peoples } from '@/schemas/docs.schemas'

type SelectOption = {
  id: number
  value: string
  label: string
}

type SelectFieldsProps = {
  label?: string
  placeholder?: string
  options?: SelectOption[]
  defaultValue?: string
  disabled?: boolean
  setOccupation?: React.Dispatch<React.SetStateAction<string>> 
}

export const Occupation = ({
  setOccupation,
}: {
  setOccupation: React.Dispatch<React.SetStateAction<string>>
}) => {
  return (
    <SelectFields
      placeholder="Select occupation"
      label="Occupation"
      options={peoples}
      setOccupation={setOccupation}
    />
  )
}

export function SelectFields({
  disabled,
  label,
  placeholder,
  options = [],
  defaultValue = '',
  setOccupation,
}: SelectFieldsProps) {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value
    // console.log(value);
    
    if (setOccupation) setOccupation(value)
  }

  return (
    <Label className="flex flex-col gap-2 dark:text-zinc-300" htmlFor={`select-${label ?? 'field'}`}>
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
          <option key={opt.id} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </Label>
  )
}
