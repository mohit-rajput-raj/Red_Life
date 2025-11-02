import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import FormGenerator from "../forms/form-generatoe"
import { useFormContext } from "react-hook-form"

export function FieldDemo({id,email ,person_id}:{id:string ,email:string ,person_id:string}){ {
  const {register , formState: {errors} } = useFormContext();
  return (
    <div className="w-full max-w-md">
        <FieldGroup>
          <FieldSet>
            <FieldLegend>welcome</FieldLegend>
            <FieldDescription>
              secure and safe
            </FieldDescription>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="checkout-7j9-card-name-43j">
                  Email
                </FieldLabel>
                <Input
                disabled={true}
                  id="checkout-7j9-card-name-43j"
                  placeholder={email}
                  value={email}
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="checkout-7j9-card-name-43j">
                  personId
                </FieldLabel>
                <Input
                disabled={true}
                  id="checkout-7j9-card-name-43j"
                  defaultValue={person_id}
                  {...register("person_id" , {required : true})}
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="checkout-7j9-card-number-uw1">
                  Request Id
                </FieldLabel>
                <Input
                disabled={true}
                  id="checkout-7j9-card-number-uw1"
                  placeholder={id}
                  defaultValue={id}
                  {...register("request_id" , {required : true})}
                />
                {/* <FieldDescription>
                  Enter your 16-digit card number
                </FieldDescription> */}
              </Field>
              <FormGenerator
                placeholder="date"
                name="date"
                register={register}
                type={"date"} inputType={"date"} errors={errors}/>
            </FieldGroup>
          </FieldSet>
          <FieldSeparator />
          
          
        </FieldGroup>
    </div>
  )
}}
