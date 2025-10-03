// 'use server'  // use `server` instead of `client` because this talks to DB

// import pool from "@/lib/db";

// export const getUserValues = async (
  
//   clerk_id: string,
  
// ) => {
//   try {
//     const query = `
//       select * from users where clerk_id = $1
//     `;
//     const values = [clerk_id];
//     const result = await pool.query(query, values);

//     if (result.rows.length > 0) {
//       return { status: 200, user: result.rows[0] };
//     }
//   } catch (error) {
//     console.error("DB Error:", error);
//     return { status: 400 };
//   }
// };

