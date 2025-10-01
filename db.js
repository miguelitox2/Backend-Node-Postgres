import postgres from "postgres";
import dotenv from "dotenv";

dotenv.config();

export const sql = postgres(process.env.DATABASE_URL);

const result = await sql`SELECT version()`;
console.log(result, "conectado");
