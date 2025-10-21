import {
  Field,
  FieldDescription,
  FieldLabel,
} from "@/components/ui/field"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { peoples } from "@/schemas/docs.schemas";
import { useFormContext } from "react-hook-form";

export function Occupation({setOccupation}:{setOccupation: React.Dispatch<React.SetStateAction<string>>}) {
    const {setValue, getValues} = useFormContext();

  return (
    <div className="w-full max-w-md">
      <Field onSubmit={()=>console.log("submitted")} className="dark:text-zinc-500">
      
        <FieldLabel>Department</FieldLabel>
        <Select onValueChange={(value)=>{setValue("role", value); setOccupation(value)}} >
          <SelectTrigger>
            <SelectValue placeholder={getValues("role")} />
          </SelectTrigger>
          <SelectContent >
            {peoples.map((peoples, i) => (
            <SelectItem key={i} value={peoples}>{peoples}</SelectItem>
              
            ))}
            
          </SelectContent>
        </Select>
        <FieldDescription>
          Select your department or area of work.
        </FieldDescription>
      </Field>
    </div>
  )
}
