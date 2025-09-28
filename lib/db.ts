import { MongoClient } from 'mongodb';

const client = new MongoClient(process.env.MONGODB_URI as unknown as string);

let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === "development") {
  // In development mode, use a global variable to avoid repeatedly creating the client during hot reloads
  let globalClient: MongoClient | undefined = (global as any)._mongoClient;
  if (!globalClient) {
    globalClient = client;
    (global as any)._mongoClient = globalClient;
  }
  clientPromise = Promise.resolve(globalClient);
} else {
  clientPromise = client.connect();
}

export default clientPromise;