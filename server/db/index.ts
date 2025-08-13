import { config } from "dotenv";
import { drizzle } from "drizzle-orm/libsql";

config({ debug: false });
export const db = drizzle(process.env.DB_FILE_NAME!);
