import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB || "sportsnest";

let cached = globalThis._mongoCached;
if (!cached) {
  cached = { client: null, clientPromise: null };
  globalThis._mongoCached = cached;
}

export async function getMongoDb() {
  if (!uri) {
    return null;
  }

  if (!cached.clientPromise) {
    cached.client = new MongoClient(uri);
    cached.clientPromise = cached.client.connect();
  }

  const client = await cached.clientPromise;
  return client.db(dbName);
}
