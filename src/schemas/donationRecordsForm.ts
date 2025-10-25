import { id } from "date-fns/locale";
import { ZodType, z } from "zod";

export const DonationRecordsSchema = z.object({
  person_id: z.number({ message: "Donor ID is required" }).int(),
  recipient_id: z.number({ message: "Invalid recipient ID" }).int().nullable().optional(),
  camp_id: z.number({ message: "Invalid camp ID" }).int().nullable().optional(),
  institution_id: z.number({ message: "Institution ID is required" }).int(),
  blood_type: z.string().min(1, { message: "Blood type is required" }).max(5, { message: "Blood type must be shorter than 5 characters" }),
  status: z.string().min(2, { message: "Status must be at least 2 characters long" }).max(20, { message: "Status can not be longer than 20 characters" }),
});

export type DonationRecordProps = z.infer<typeof DonationRecordsSchema>