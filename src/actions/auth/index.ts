'use server'  // use `server` instead of `client` because this talks to DB

import pool from "@/lib/db";

export const onCompleteUserRegistration = async (
  fullname: string,
  clerk_id: string,
  user_type: string,
  email: string
) => {
  try {
    const query = `
      INSERT INTO users (fullname, clerk_id, user_type, email)
      VALUES ($1, $2, $3, $4)
      RETURNING fullname, clerk_id, user_type;
    `;
    const values = [fullname, clerk_id, user_type, email];
    const result = await pool.query(query, values);

    if (result.rows.length > 0) {
      return { status: 200, user: result.rows[0] };
    }
  } catch (error) {
    console.error("DB Error:", error);
    return { status: 400 };
  }
};


export const FillUserProfile = async(phone: string, dob: string, gender: string, clerk_id: string) => {
    try {
        const query = `
          UPDATE users
          SET phone = $1, dob = $2, gender = $3
          WHERE clerk_id = $4
          RETURNING phone, dob, gender;
        `;
        const values = [phone, dob, gender, clerk_id];
        const result = await pool.query(query, values);

        if (result.rows.length > 0) {
          return { status: 200, user: result.rows[0] };
        } else {
          return { status: 404, message: "User not found" };
        }
      } catch (error) {
        console.error("DB Error:", error);
        return { status: 400 }; // Bad Request
      }}


export const FillUserAddress = async (
  addressLine1: string,
  addressLine2: string | null,
  district: string,
  city: string,
  state: string,
  country: string,
  postalCode: string,
  clerk_id: string
) => {
  try {
    const insertAddressQuery = `
      INSERT INTO address (address_line1, address_line2, district, city, state, country, postal_code)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING address_id;
    `;

    const addressResult = await pool.query(insertAddressQuery, [
      addressLine1,
      addressLine2,
      district,
      city,
      state,
      country,
      postalCode,
    ]);

    const addressId = addressResult.rows[0].address_id;

    const updateUserQuery = `
      UPDATE users
      SET address_id = $1 
      WHERE clerk_id = $2
      RETURNING *;
    `;

    const userResult = await pool.query(updateUserQuery, [addressId, clerk_id]);

    return userResult.rows[0]; 
  } catch (error) {
    console.error("Error filling user address:", error);
    throw error;
  }
};

