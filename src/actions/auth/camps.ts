"use server";

import pool from "@/lib/db";
import { CampProps } from "@/schemas/camp.schemas";
import { addressInsert } from "./addressInsert";

export const getSimplePersons = async () => {
  try {
    const query = `
  SELECT 
  s.*
FROM users AS u
LEFT JOIN simple_person AS s
  ON u.user_id = s.person_id
WHERE LENGTH(u.clerk_id) > 35
LIMIT 3000;

`;

    const res = await pool.query(query);
    if (res) {
      return res.rows;
    }
  } catch (error) {
    console.log(error);
  }
};
export const insertDonationRecord = async ({ data }: { data: any }) => {
  try {
    console.log(data , "record");
    
    const queries = `INSERT INTO donation_record (person_id, camp_id, institution_id, date, status , recipient_id) VALUES ($1, $2, $3, $4, $5 , $6) RETURNING *`;
    const values = [
      Number(data.person_id),
      Number(data.camp_id),
      Number(data.institution_id),
      new Date(),
      data.status,
      Number(data.recipient_id)
    ];
    const res = await pool.query(queries, values);
    if(res){
      return{
        status:200,
        message:'donation record created successfully',
        res:res.rows[0]
      }
    }else{
      return{
        status:500,
        message:'something went wrong'
      }
    }
  } catch (error) {
    console.log(error);
  }
}
export const dbSimplePerson = async ({ id }: { id: number }) => {
  try {
    const query = `select * from simple_person where person_id = $1`;
    const values = [id];
    const res = await pool.query(query, values);
    if (res) {
      return res.rows[0];
    }
    return []
  } catch (error) {
    console.log(error);
  }
};
export const dbGetBlood_requests = async ({ id }: { id: number }) => {
  try {
    const query = `
  SELECT
    br.request_id,
    br.person_id,
    u.fullname AS person_name,
    u.email AS person_email,
    u.phone AS person_phone,
    br.blood_type,
    br.quantity,
    br.institution_id,
    i.name AS institution_name,
    br.status,
    br.created_at
  FROM blood_request br
  JOIN simple_person sp
    ON br.person_id = sp.person_id
  JOIN users u
    ON sp.person_id = u.user_id
  LEFT JOIN institution i
    ON br.institution_id = i.institution_id
  WHERE br.institution_id = $1;
`;
    // const query = `select * from blood_request where institution_id = $1`;
    const values = [id];
    const res = await pool.query(query, values);

    if (res) {
      return res.rows;
    }
  } catch (error) {
    console.log(error);
  }
};
export const dbGetDonationRecord = async (id: number) => {
  try {
    const query = `
    SELECT
  dr.donation_id,
  dr.person_id,
  u.fullname AS donor_name,
  u.email AS donor_email,
  sp.blood_type,
  dr.camp_id,
  dr.institution_id,
  i.name AS institution_name,
  dr.date,
  dr.status
FROM donation_record dr
JOIN simple_person sp 
  ON dr.person_id = sp.person_id
JOIN users u 
  ON sp.person_id = u.user_id
LEFT JOIN institution i 
  ON dr.institution_id = i.institution_id
WHERE dr.camp_id = $1;

    `;
    const result = await pool.query(query, [id]);
    return result.rows;
  } catch (error) {
    console.log(error);
  }
};
export const dbGetMyRequests = async ({ id }: { id: number }) => {
  console.log(id);

  try {
    const query = `
    select * from blood_request where person_id = $1
    `;
    const result = await pool.query(query, [id]);

    return result.rows;
  } catch (error) {
    console.log(error);
  }
};
export const dbGetAllCampWorkFlow = async (id: number) => {
  try {
    const query = `
      SELECT cw.*
      FROM camp_workflow cw
      WHERE cw.camp_id IN (
        SELECT dc.camp_id
        FROM donation_camp dc
        WHERE dc.organized_by = $1
      );
    `;
    const values = [id];
    const result = await pool.query(query, values);

    return result.rows;
  } catch (error) {
    console.error("DB Error:", error);
    return null;
  }
};
export const dbGetCampData = async (id: number) => {
  try {
    const query = `
    select * from donation_camp where camp_id = $1
    `;
    const result = await pool.query(query, [id]);
    return result.rows[0];
  } catch (error) {
    console.log(error);
  }
};
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

    const workFlowQueries = `insert into camp_workflow (camp_id , status) values ($1 , $2 ) returning workflow_id`;
    const workFlowValues = [result.rows[0].camp_id, "pending"];
    const workFlowResult = await pool.query(workFlowQueries, workFlowValues);
    return {
      status: 200,
      message: "workflow creates successfully",
      camp_id: result.rows[0].camp_id,
      workflow_id: workFlowResult.rows[0].workflow_id,
    };
  } catch (error) {
    console.log(error);
  }
};
export const bulkInsertUsers = async (
  users: { name: string; clerk_id: string; user_type: string; email: string }[],
  chunkSize = 500
) => {
  const insertedIds: number[] = [];

  try {
    for (let i = 0; i < users.length; i += chunkSize) {
      const chunk = users.slice(i, i + chunkSize);

      const values: any[] = [];
      const placeholders = chunk
        .map((user, j) => {
          const base = j * 4; // 4 columns
          values.push(user.name, user.clerk_id, user.user_type, user.email);
          return `($${base + 1}, $${base + 2}, $${base + 3}, $${base + 4})`;
        })
        .join(", ");

      const query = `
        INSERT INTO users (fullname, clerk_id, user_type, email)
        VALUES ${placeholders}
        RETURNING user_id;
      `;

      const result = await pool.query(query, values);
      insertedIds.push(...result.rows.map((r) => r.user_id));
    }

    return { status: 200, inserted: insertedIds.length };
  } catch (error) {
    console.error("Bulk insert error:", error);
    return { status: 400 };
  }
};

export const getDatesOfCamp = async ({ ids }: { ids: number[] }) => {
  if (!ids.length) return [];

  try {
    const query = `
      SELECT date, end_date 
      FROM donation_camp 
      WHERE camp_id = ANY($1)
    `;
    const values = [ids];
    const result = await pool.query(query, values);
    return result.rows;
  } catch (error) {
    console.error("Error fetching camp dates:", error);
    return [];
  }
};
export const getInventoryByInstitution = async () => {
  try {
    const query = `
      SELECT *
      FROM inventory
      
    `;
    const result = await pool.query(query);
    return result.rows;
  } catch (error) {
    console.error("Error fetching camp dates:", error);
    return [];
  }
};
export const InsertInventoryRecords = async ({
  iid,
  inventory,
}: {
  iid: number;
  inventory: { blood_type: string; units: number }[];
}) => {
  console.log(inventory, "dhoom", iid);

  try {
    for (const inv of inventory) {
      if (inv.units > 0) {
        await pool.query(
          `
          UPDATE inventory
          SET units_available = units_available + $1
          WHERE institution_id = $2 AND blood_type = $3
        `,
          [inv.units, iid, inv.blood_type]
        );
      }
    }

    console.log(" Inventory updated successfully!");
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const chunkedInsert = async (
  table: string,
  columns: string[],
  rows: any[],
  chunkSize = 500
) => {
  if (!rows.length) return { inserted: 0 };

  let totalInserted = 0;
  const client = await pool.connect();

  try {
    for (let i = 0; i < rows.length; i += chunkSize) {
      const chunk = rows.slice(i, i + chunkSize);
      const values: any[] = [];

      const placeholders = chunk
        .map((row, j) => {
          const base = j * columns.length;
          columns.forEach((col) => values.push(row[col]));
          return `(${columns.map((_, k) => `$${base + k + 1}`).join(",")})`;
        })
        .join(",");

      const query = `INSERT INTO ${table} (${columns.join(
        ","
      )}) VALUES ${placeholders}`;

      await client.query("BEGIN");
      try {
        await client.query(query, values);
        totalInserted += chunk.length;
        await client.query("COMMIT");
      } catch (err) {
        await client.query("ROLLBACK");
        console.error(`Error inserting into ${table} (chunk ${i / chunkSize}):`, err);
        throw err;
      }
    }
  } finally {
    client.release();
  }

  return { inserted: totalInserted };
};

export const getInsertedUsers = async (clerkIds: string[]) => {
  try {
    const placeholders = clerkIds.map((_, i) => `$${i + 1}`).join(",");

    const query = `
      SELECT user_id, clerk_id 
      FROM users 
      WHERE user_type = 'user' 
      AND clerk_id IN (${placeholders})
    `;

    const res = await pool.query(query, clerkIds);
    return res.rows;
  } catch (error) {
    console.error("Error fetching inserted users:", error);
    return [];
  }
};
