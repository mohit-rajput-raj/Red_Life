// import {Pool} from 'pg';

// const pool = new Pool({
//   user: process.env.PGUSER,        
//   host: process.env.PGHOST,        
//   database: process.env.PGDATABASE,
//   password: process.env.PGPASSWORD,
//   port: process.env.PGPORT as unknown as number,        
// });

// export default pool;



import { Pool } from "pg"

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
})

export default pool
