import express from "express";
import pg from "pg";
const { Pool } = pg;
import "dotenv/config";
import { MongoClient } from "mongodb";

const app = express();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL_POSTGRES,
});

const mongoClient = new MongoClient(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function migrateData() {
  try {
    // Connect to PostgreSQL
    const pgClient = await pool.connect();
    // Retrieve all data from a specific table in PostgreSQL
    const pgData = await pgClient.query("SELECT * FROM random_data");
    pgClient.release();
    console.log("Data retrieved from PostgreSQL:", pgData.rows);

    // Connect to MongoDB
    await mongoClient.connect();
    const db = mongoClient.db(process.env.MONGO_DB);
    const collection = db.collection(process.env.COLLECTION);

    // Insert data into MongoDB
    const insertResult = await collection.insertMany(pgData.rows);
    console.log(insertResult);
  } catch (error) {
    console.error("Migration failed:", error);
  } finally {
    await mongoClient.close();
  }
}

const PORT = process.env.PORT || 3000;
app.listen(3000, () => {
  console.log(`Server is running on port ${PORT}`);
  migrateData();
});
