"use server";
import pool from "@/lib/db";
export const CreateStaff = async (data: any) => {
    try {
        const query = `INSERT INTO staff (staff_id, role, institution_id) VALUES ($1, $2, $3) RETURNING *`;
        const values = [data.staff_id, data.role, data.institution_id];
        const res = await pool.query(query, values);
        const queries2 = `update users set is_profile_completed = true where user_id = $1 returning is_profile_completed;`;
        const values2 = [data.staff_id];
        const res2 = await pool.query(queries2, values2);
        return { status: 200, data: res.rows[0], data2: res2.rows[0] , message:'staff created successfully' };
        
    } catch (error) {
        console.log(error);
        return{
            status:500,
            message:'something went wrong'
        }
        
    }
};