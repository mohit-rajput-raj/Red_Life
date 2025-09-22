'use server'  // use `server` instead of `client` because this talks to DB

import pool from "@/lib/db";

export const onCompleteUserRegistration = async (
  name: string,
  clerk_id: string,
  user_type: string
) => {
  try {
    const query = `
      INSERT INTO users (name, clerk_id, user_type)
      VALUES ($1, $2, $3)
      RETURNING name, clerk_id, user_type;
    `;
    const values = [name, clerk_id, user_type];
    const result = await pool.query(query, values);

    if (result.rows.length > 0) {
      return { status: 200, user: result.rows[0] };
    }
  } catch (error) {
    console.error("DB Error:", error);
    return { status: 400 };
  }
};

