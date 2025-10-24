import { ZodType, z } from "zod";
// import { staff } from "./usersschemas";
const institute = ['Hospital','BloodBank','StorageCenter'];

export const  CeateHospitalFormSchema = z.object({
    name: z.string().min(4, { message: "Hospital name must be atleast 4 characters long" }),
    type:z.enum(institute),
    contact_no: z.string().min(10, { message: "You must enter a valid phone number" }).max(15, { message: "You must enter a valid phone number" }),
    address_line1: z.string().min(1 , {message : 'You must enter a valid address line 1'}),
    city: z.string().min(1 , {message : 'You must enter a valid city'}),
    state: z.string().min(1 , {message : 'You must enter a valid state'}),
    country: z.string().min(1 , {message : 'You must enter a valid country'}),
    postal_code: z.string().min(1 , {message : 'You must enter a valid postal code'}),
})

export type CreateHospitalFormProps = z.infer<typeof CeateHospitalFormSchema>
export const staff = ['Admin','Nurse','Clerk','Technician','Other'];


export const DoctorFormSchems = z.object({
    doctor_id : z.string().min(1 , {message : 'You must enter a valid doctor id'}),
  specialization : z.string().min(1 , {message : 'You must enter a valid specialization'}),
  institution_id : z.number().min(1 , {message : 'You must enter a valid institution id'}),
  identification_id : z.string().min(1 , {message : 'You must enter a valid identification id'}),
})
export type DoctorFormProps = z.infer<typeof DoctorFormSchems>

export const StaffFormSchems = z.object({
  staff_id : z.string().min(1 , {message : 'You must enter a valid staff id'}),
  role:z.enum(staff),
  institution_id:z.number().min(1 , {message : 'You must enter a valid institution id'}),
  
})
export type StaffFormProps = z.infer<typeof StaffFormSchems>