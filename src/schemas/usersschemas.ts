import {z , ZodType} from 'zod'

export const CompleteUserSchema = z.object({
    phone: z.string().min(10 , {message : 'You must enter a valid phone number'}),
    dob: z.string().min(10 , {message : 'You must enter a valid date of birth'}),
    gender: z.string().min(1 , {message : 'You must enter a valid gender'}),
    profileImage: z.string().min(10 , {message : 'You must enter a valid profile image'}).optional()
})

export type CompleteUserProps = z.infer<typeof CompleteUserSchema>


export const CompleteUserAddressSchema = z.object({
    addressLine1: z.string().min(3 , {message : 'You must enter a valid address'}),
    addressLine2: z.string().optional(),
    city: z.string().min(3 , {message : 'You must enter a valid city'}),
    district: z.string().min(3 , {message : 'You must enter a valid district'}),
    state: z.string().min(3 , {message : 'You must enter a valid state'}),
    country: z.string().min(3 , {message : 'You must enter a valid country'}),
    postalCode: z.string().min(3 , {message : 'You must enter a valid postal code'}),
})

export type CompleteUserAddressProps = z.infer<typeof CompleteUserAddressSchema>