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

async function testDbConnection() {
  try {
    const client = await pool.connect();
    const result = await client.query("SELECT * FROM random_data");
    client.release();
    console.log(
      "Database connection is successful. Retrieved data:",
      result.rows
    );
  } catch (error) {
    console.error("Database connection failed:", error);
  }

  try {
    await mongoClient.connect();
    console.log("MongoDB connection is successful.");

    const db = mongoClient.db(process.env.MONGO_DB);
    const collection = db.collection(process.env.COLLECTION);

    const sampleData = {
      name: "John Doe",
      age: 30,
      email: "john.doe@example.com",
    };
    await collection.insertOne(sampleData);
    console.log("Sample data inserted into MongoDB.");

    // Retrieve the inserted data
    const insertedData = await collection.findOne({ name: "John Doe" });
    console.log("Retrieved data from MongoDB:", insertedData);
  } catch (error) {
    console.error("MongoDB connection failed:", error);
  } finally {
    await mongoClient.close();
  }
}

const PORT = process.env.PORT || 3000;
app.listen(3000, () => {
  console.log(`Server is running on port ${PORT}`);
  testDbConnection();
});
