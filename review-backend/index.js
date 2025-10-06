import dotenv from "dotenv";
import ReviewsDao from "./dao/reviewsDao.js"
dotenv.config();

import app from "./server.js";
import { MongoClient } from "mongodb";

const username = encodeURIComponent(process.env.MONGO_USERNAME);
const password = encodeURIComponent(process.env.MONGO_PASSWORD);
const dbName = process.env.MONGO_DB;

const uri = `mongodb+srv://${username}:${password}@cluster0.snlcbig.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
const PORT = 8000;

async function startServer() {
  try {
    const client =  new MongoClient(uri, 

{       maxPoolSize: 50,
  wtimeoutMS: 2500
});

    

    await client.connect();
    console.log("✅ MongoDB connected successfully");
    await ReviewsDao.injectDb(client)
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error(err.stack);
    process.exit(1);
  }
}

startServer();
