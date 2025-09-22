import pool from "@/lib/db";

export async function GET() {
  try {
    const result = await pool.query("SELECT * FROM users");
    return new Response(JSON.stringify(result.rows), { status: 200 });
  } catch (err) {
    console.error("DB Error:", err);
    return new Response("Database error", { status: 500 });
  }
}
