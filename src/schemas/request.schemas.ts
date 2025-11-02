// CREATE TABLE blood_request (
//     request_id SERIAL PRIMARY KEY,
//     person_id INT,
//     blood_type VARCHAR(5),
//     quantity INT,
//     institution_id INT,
//     status VARCHAR(20),
//     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//     FOREIGN KEY (person_id) REFERENCES simple_person(person_id),
//     FOREIGN KEY (institution_id) REFERENCES institution(institution_id)
// );

import { z } from "zod";

export const RequestBloodSchema = z.object({
    blood_type: z.string().min(1, { message: "Blood type is required" }),
    quantity:  z.string().min(1, { message: "Quantity is required" }),
    institution_id: z.string().min(1, { message: "Institution ID is required" }),
});

export type RequestBloodProps = z.infer<typeof RequestBloodSchema>;


export const simplePersonSchema = z.object({
    blood_type: z.string().min(1, { message: "Blood type is required" }),
    medical_conditions : z.string().min(1, { message: "Medical conditions is required" })
})
export type SimplePersonProps = z.infer<typeof simplePersonSchema>;