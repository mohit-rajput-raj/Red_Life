"use server";

import pool from "@/lib/db";
import { CampProps } from "@/schemas/camp.schemas";
import { addressInsert } from "./addressInsert";
import { toast } from "sonner";
export const dbGetCampData = async (id:number) => {
  try {
    const query = `
    select * from donation_camp where camp_id = $1
    `
    const result = await pool.query(query,[id])
    return result.rows[0]
  } catch (error) {
    console.log(error);
    
  }
}
export const CreateCampsqueries = async (data: CampProps) => {
  try {
    const address_response = await addressInsert({
      address_line1: data.address_line1,
      city: data.city,
      state: data.state,
      country: data.country,
      postal_code: data.postalCode,
    });
    const queries = `
        insert into donation_camp (name , date , end_date , institution_id , organized_by , address_id , about)
        values ($1 , $2 , $3 , $4 , $5 , $6 , $7)
        returning camp_id
        `;
    const values = [
      data.name,
      data.date,
      data.end_date,
      data.institution_id,
      data.organized_by,
      address_response.address_id,
      data.about,
    ];
    const result = await pool.query(queries, values);

    const workFlowQueries = `insert into camp_workflow (camp_id , status) values ($1 , $2 ) returning workflow_id`
    const workFlowValues = [result.rows[0].camp_id , 'pending']
    const workFlowResult = await pool.query(workFlowQueries,workFlowValues)
    return {
        status:200,
        message:"workflow creates successfully",
      camp_id : result.rows[0].camp_id,
      workflow_id : workFlowResult.rows[0].workflow_id
    }
  } catch (error) {
    console.log(error);
    
  }
};
