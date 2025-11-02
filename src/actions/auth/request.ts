"use server";

import pool from "@/lib/db";
import { RequestBloodProps } from "@/schemas/request.schemas";
export const setBloodRequest = async ({
  data,
  personid,
}: {
  data: RequestBloodProps;
  personid: number;
}) => {
  try {
    const queries = `INSERT INTO blood_request (blood_type, quantity, institution_id, person_id , status) VALUES ($1, $2, $3, $4 , $5) RETURNING *`;
    const values = [
      data.blood_type,
      data.quantity,
      data.institution_id,
      personid,
      "pending",
    ];
    const res = await pool.query(queries, values);
    return { status: 200, res: res.rows[0] };
  } catch (error) {
    console.log(error);
  }
};
export const insertSimpleperson = async ({
  data,
  personid,
}: {
  data: any;
  personid: number;
}) => {
  try {
    const queries = `INSERT INTO simple_person (blood_type, medical_conditions, person_id) VALUES ($1, $2, $3) RETURNING *`;
    const values = [data.blood_type, data.medical_conditions, personid];
    const res = await pool.query(queries, values);
    const newQuery = `UPDATE users SET   is_profile_completed = true WHERE user_id = $1 RETURNING *`;
    const newValues = [personid];
    await pool.query(newQuery, newValues);
    return { status: 200, res: res.rows[0] };
  } catch (error) {
    console.log(error);
  }
};


export const createAppointments = async ({data , id }:{data:{request_id:string , date:Date , person_id:string} , id:number}) => {
  try {
    const queries = `INSERT INTO appointment ( date, person_id , institution_id ,status) VALUES ($1, $2, $3  , $4 ) RETURNING *`;
    const values = [ data.date, id , id , "pending"];
    const res = await pool.query(queries, values);
    const queries2 = `UPDATE blood_request SET status = 'accepted' WHERE request_id = $1 RETURNING *`;
    const values2 = [data.request_id];
    const res2 = await pool.query(queries2, values2);
    if(res2){
    return { status: 200, res: res2.rows[0] , message:'appointment created successfully' };
      
    }
    return { status: 500, message:'something went wrong' };
    
  } catch (error) {
    console.log(error);
  }
};
