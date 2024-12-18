import { drizzle } from "drizzle-orm/libsql";
import * as schema from "./schema";

export const db = drizzle({
  connection: `file:${import.meta.dir}/../data/sqlite.db`,
  schema,
});

export type DbConnection = typeof db;
