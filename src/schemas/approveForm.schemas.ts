import { request } from 'http'
import { ZodType, date, z } from 'zod'


export const ApproveFormSchema = z.object({
    person_id: z.string().min(1, { message: "Donor ID is required" }),
    request_id: z.string().min(1, { message: "Request ID is required" }),
    date: z.date().min(new Date('1900-01-01'), {message : 'You must enter a valid date'})
})

export type ApproveFormProps = z.infer<typeof ApproveFormSchema>