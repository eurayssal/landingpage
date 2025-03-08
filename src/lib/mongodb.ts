import { MongoClient } from "mongodb";

const MONGODB_URI = process.env.MONGODB_URI as string;
const MONGODB_DB = "sample_mflix";

if (!MONGODB_URI) {
    throw new Error("❌ MONGODB_URI não está definida nas variáveis de ambiente.");
}

let cachedClient: MongoClient | null = null;

export async function connectToDatabase() {
    if (cachedClient) return cachedClient;

    const client = new MongoClient(MONGODB_URI);
    await client.connect();

    cachedClient = client;
    console.log("✅ Conectado ao MongoDB");

    return client;
}
