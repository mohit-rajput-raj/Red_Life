import {  z } from "zod";
import { staff } from "./institute.schemas";


export const DocsProfileSchema = z.object({
    fullname: z.string().min(4, { message: "Your full name must be atleast 4 characters long" }),
    phone: z.string().min(10, { message: "You must enter a valid phone number" }).max(15, { message: "You must enter a valid phone number" }),
    address: z.string().min(10, { message: "Your address must be atleast 10 characters long" }).max(100, { message: "Your address can not be longer then 100 characters long" }),
    city: z.string().min(2, { message: "Your city must be atleast 2 characters long" }).max(50, { message: "Your city can not be longer then 50 characters long" }),
    country: z.string().min(2, { message: "Your country must be atleast 2 characters long" }).max(50, { message: "Your country can not be longer then 50 characters long" }),
    postalCode: z.string().min(4, { message: "Your postal code must be atleast 4 characters long" }).max(10, { message: "Your postal code can not be longer then 10 characters long" }),
    about: z.string().min(10, { message: "Your about must be atleast 10 characters long" }).max(500, { message: "Your about can not be longer then 500 characters long" }).optional(),
    image: z.string().min(10, { message: "Your image must be atleast 10 characters long" }).max(500, { message: "Your image can not be longer then 500 characters long" }).optional(),
})


export type DocsProfileProps = z.infer<typeof DocsProfileSchema>;


export const DocsHospitalProfileSchema = z.object({
    name: z.string().min(4, { message: "Hospital name must be atleast 4 characters long" }),
    email1: z.string().email({ message: "Incorrect email format" }),
    email2: z.string().email({ message: "Incorrect email format" }).optional(),
    phone: z.string().min(10, { message: "You must enter a valid phone number" }).max(15, { message: "You must enter a valid phone number" }),
    address: z.string().min(10, { message: "Your address must be atleast 10 characters long" }).max(100, { message: "Your address can not be longer then 100 characters long" }),
    city: z.string().min(2, { message: "Your city must be atleast 2 characters long" }).max(50, { message: "Your city can not be longer then 50 characters long" }),
    country: z.string().min(2, { message: "Your country must be atleast 2 characters long" }).max(50, { message: "Your country can not be longer then 50 characters long" }),

})

export type DocsHospitalProfileProps = z.infer<typeof DocsHospitalProfileSchema>;




export const staffOptions = [
 {
    value:"Admin",
    label:"Admin",
    id:1
 },
 {
    value:"Nurse",
    label:"Nurse",
    id:2
 },
 {
    value:"Clerk",
    label:"Clerk",
    id:3
 },
 {
    value:"Technician",
    label:"Technician",
    id:4
 },
 {
    value:"Other",
    label:"Other",
    id:5
 }
  ];

export const peoples = [
    
    {
      value: "Doctor",
      label: "Doctor",
      id: 1,
    },
    {
      value: "Worker",
      label: "Worker",
      id: 2,
    }
];

export const StaffSchema = z.object({
  role: z.enum(staff),
  key: z.string().min(10),
});

export type StaffProps = z.infer<typeof StaffSchema>;