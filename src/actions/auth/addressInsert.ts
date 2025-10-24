'use server' 

import pool from "@/lib/db";
import { toast } from "sonner";

export interface Address {
  address_id?: number;            
  address_line1?: string | null;
  address_line2?: string | null;
  area?: string | null;
  city: string;                   
  district?: string | null;
  state: string;               
  country?: string;              
  postal_code?: string | null;
  latitude?: number | null;       
  longitude?: number | null;    
  timezone?: string | null;
  created_at?: string | Date;    
}

export const addressInsert = async ({city,state,country,postal_code,address_line1 }:Address) => {
    try {
        const queries = `
        insert into address (city, state, country, postal_code, address_line1)
        values ($1, $2, $3, $4, $5)
        returning address_id ;
        `
        const values = [city,state,country,postal_code,address_line1]
        const result = await pool.query(queries,values)
        return result.rows[0]
        
    } catch (error) {
        console.log(error);
        
        toast.error("problem in addressInsert")
    }
}