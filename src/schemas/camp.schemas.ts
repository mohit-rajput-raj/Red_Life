import { z } from "zod";

export const CampSchema = z.object({
    name: z.string().min(4, { message: "Camp name must be atleast 4 characters long" }),
    date: z.date().min(new Date('1900-01-01'), {message : 'You must enter a valid start date'}),
    end_date:z.date().min(new Date('1900-01-01'), {message : 'You must enter a valid end date'}),
   institution_id : z.string().min(1 , {message : 'You must enter a valid institution id'}),
   organized_by : z.string().min(1, { message: "You must enter a valid organizer name" }),
   
   address_line1: z.string().min(10, { message: "Your address must be atleast 10 characters long" }).max(500, { message: "Your address can not be longer then 500 characters long" }),
    state: z.string().min(2, { message: "Your state must be atleast 2 characters long" }).max(50, { message: "Your state can not be longer then 50 characters long" }),
    city: z.string().min(2, { message: "Your city must be atleast 2 characters long" }).max(50, { message: "Your city can not be longer then 50 characters long" }),
    country: z.string().min(2, { message: "Your country must be atleast 2 characters long" }).max(50, { message: "Your country can not be longer then 50 characters long" }),
    postalCode: z.string().min(4, { message: "Your postal code must be atleast 4 characters long" }).max(10, { message: "Your postal code can not be longer then 10 characters long" }),
    about: z.string().min(10, { message: "Your about must be atleast 10 characters long" }).max(500, { message: "Your about can not be longer then 500 characters long" }).optional(),
})

export type CampProps = z.infer<typeof CampSchema>