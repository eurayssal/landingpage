import { connectToDatabase } from "../src/lib/mongodb.js";

export async function getData() {
    const client = await connectToDatabase();
    const db = client.db("sample_mflix");
    const collection = db.collection("movies");

    const data = await collection.find({}).limit(10).toArray();

    return data.map((item) => ({
        _id: item._id.toString(),
        fullplot: item.fullplot,
    }));
}
