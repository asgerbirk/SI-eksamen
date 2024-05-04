import sqlite3 from "sqlite3";
import { open } from "sqlite";

async function openDb() {
  return open({
    filename: "./webhooks.db",
    driver: sqlite3.Database,
  });
}

export async function setupDb() {
  const db = await openDb();
  await db.exec(
    "CREATE TABLE IF NOT EXISTS webhooks (id INTEGER PRIMARY KEY, url TEXT UNIQUE, eventType TEXT)"
  );
  return db;
}
