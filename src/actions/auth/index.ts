'use server' 

import pool from "@/lib/db";
import { CreateHospitalFormProps } from "@/schemas/institute.schemas";
import { UsersAddessData, usersaddressdata } from "@/types/pgType";
import { toast } from "sonner";


export const getUserInstituteById = async (id: number) => {
  try {
    const instiQuery = `
      SELECT * FROM institution WHERE managed_by = $1
    `;
    const instiValues = [id];
    const instiResult = await pool.query(instiQuery, instiValues);

    return instiResult.rows; 
  } catch (error) {
    console.log(error);
  }
};

export const createInstitution = async (
  {data , managed_by}:
  {data: CreateHospitalFormProps,
  managed_by: string}
  
) =>{
  try {
    const insertQuery = `
      INSERT INTO address (  address_line1, city, state, country, postal_code)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING address_id;
    `;
    const insertValues = [
      data.address_line1,
      data.city,
      data.state,
      data.country,
      data.postal_code,
    ];
    console.log(managed_by);
    
    const insertResult = await pool.query(insertQuery, insertValues);
    const addressId = insertResult.rows[0].address_id;

    const insertInstitutionQuery = `
      INSERT INTO institution (name, address_id, type, contact_no,managed_by )
      VALUES ($1, $2, $3, $4, $5)
      returning institution_id;
    `;
    console.log(addressId);
    
    const insertInstitutionValues = [
      data.name,
      addressId,
      data.type || "Hospital",
      data.contact_no,
      managed_by 
    ];
    const res = await pool.query(insertInstitutionQuery, insertInstitutionValues);
    return {
      status: 200,
      message: "Institution created successfully",
      data: res.rows[0],};
  } catch (error) {
    // toast.error("error in createInstitution");
    console.log(error);
    
  }
}

export const UpdateUsersAddress = async (
  data: usersaddressdata,
  userId: number,
  address_id: number
) => {
  try {
    let newAddressId = address_id;

    if (address_id === 0) {
      const insertQuery = `
        INSERT INTO address (address_line1, address_line2, city, state, country, postal_code)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING address_id;
      `;
      const insertValues = [
        data.address_line1,
        data.address_line2,
        data.city,
        data.state,
        data.country,
        data.postal_code,
      ];
      const insertResult = await pool.query(insertQuery, insertValues);
      newAddressId = insertResult.rows[0].address_id;

      const updateUserQuery = `
        UPDATE users
        SET address_id = $1
        WHERE clerk_id = $2
      `;
      await pool.query(updateUserQuery, [newAddressId, userId]);
    } else {
      const updateQuery = `
        UPDATE address
        SET
          address_line1 = $1,
          address_line2 = $2,
          city          = $3,
          state         = $4,
          country       = $5,
          postal_code   = $6
        WHERE address_id = $7
        RETURNING address_id;
      `;
      const updateValues = [
        data.address_line1,
        data.address_line2,
        data.city,
        data.state,
        data.country,
        data.postal_code,
        address_id,
      ];
      await pool.query(updateQuery, updateValues);
    }

    return {
      status: 200,
      address_id: newAddressId,
      success: true,
    };
  } catch (error) {
    console.error("DB Error:", error);
    return {
      status: 500,
      address_id: null,
      success: false,
      message: "Error creating/updating address",
    };
  }
};




export const FillUserProfile = async(phone: string, dob: Date, gender: string,profile_image: string, clerk_id: string) => {
    try {
        const query = `
          UPDATE users
          SET phone = $1, dob = $2, gender = $3, profile_image = $4
          WHERE clerk_id = $5
          RETURNING phone, dob, gender;
        `;
        const values = [phone, dob, gender,profile_image, clerk_id];
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



export const GetUserAddressById = async (id: number) => {
  try {
    const query = `
      SELECT * FROM address WHERE address_id = $1
    `;
    const values = [id];
    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.error("DB Error:", error);
    return null;
  }
};
// export const FillUserAddress = async (
//   addressLine1: string,
//   addressLine2: string | null,
//   city: string,
//   state: string,
//   country: string,
//   postalCode: string,
//   clerk_id: string
// ) => {
//   try {
//     const insertAddressQuery = `
//       INSERT INTO address (address_line1, address_line2,  city, state, country, postal_code)
//       VALUES ($1, $2, $3, $4, $5, $6)
      
//       RETURNING address_id;
//     `;

//     const addressResult = await pool.query(insertAddressQuery, [
//       addressLine1,
//       addressLine2,
//       city,
//       state,
//       country,
//       postalCode,
//     ]);

//     const addressId = addressResult.rows[0].address_id;

//     const updateUserQuery = `
//       UPDATE users
//       SET address_id = $1 
//       WHERE clerk_id = $2
//       RETURNING *;
//     `;

//     const userResult = await pool.query(updateUserQuery, [addressId, clerk_id]);

//     return userResult.rows[0]; 
//   } catch (error) {
//     console.error("Error filling user address:", error);
//     throw error;
//   }
// };

export const GetUserByClerkId = async (clerk_id: string) => {
  try {
    const query = `
      SELECT * FROM users WHERE clerk_id = $1
    `;
    const values = [clerk_id];
    const result = await pool.query(query, values);
    console.log(result.rows[0] , "from direct fetch");
    
    return result.rows[0];
  } catch (error) {
    console.error("DB Error:", error);
    return null;
  }
};  

