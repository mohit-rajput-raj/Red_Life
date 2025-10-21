import { add } from 'date-fns'
import {z , ZodType} from 'zod'

export const CompleteUserSchema = z.object({
    phone: z.string().min(10 , {message : 'You must enter a valid phone number'}),
    dob: z.date().min(new Date('1900-01-01'), {message : 'You must enter a valid date of birth'}),
    gender: z.string().min(1 , {message : 'You must enter a valid gender'}),
    profile_image: z
    .any()
    .refine((files) => files?.length === 1, "Image is required")
    .refine(
      (files) => ["image/jpeg", "image/png"].includes(files?.[0]?.type),
      "Only .jpg and .png files are accepted"
    ).optional(),
})

export type CompleteUserProps = z.infer<typeof CompleteUserSchema>
export const doctorSchemas = z.object({
  specialization : z.string().min(1 , {message : 'You must enter a valid specialization'}),
  institution_id : z.number().min(1 , {message : 'You must enter a valid institution id'}),
})
export type doctorSchemasProps = z.infer<typeof doctorSchemas>
export const staff = ['Admin','Nurse','Clerk','Technician','Other'];
export const staffSchemas = z.object({
  role:z.enum(staff),
  institution_id:z.number().min(1 , {message : 'You must enter a valid institution id'}),
  
})
export type staffSchemasProps = z.infer<typeof staffSchemas>

export const CompleteUserAddressSchema = z.object({
    address_line1: z.string().min(1 , {message : 'You must enter a valid address line 1'}),
    address_line2: z.string().min(1 , {message : 'You must enter a valid address line 2'}).optional(),
    city: z.string().min(1 , {message : 'You must enter a valid city'}),
    state: z.string().min(1 , {message : 'You must enter a valid state'}),
    country: z.string().min(1 , {message : 'You must enter a valid country'}),
    postal_code: z.string().min(1 , {message : 'You must enter a valid postal code'}),

})

export type CompleteUserAddressProps = z.infer<typeof CompleteUserAddressSchema>