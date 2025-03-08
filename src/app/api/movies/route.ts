import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";

export async function GET() {
    try {
        const client = await connectToDatabase();
        const db = client.db("sample_mflix");
        const collection = db.collection("movies");

        const data = await collection.find({}).sort({ metacritic: -1 }).limit(10).toArray();

        return NextResponse.json(data.length > 0 ? data.map((item) => ({
            _id: item._id.toString(),
            fullplot: item.fullplot,
        })) : []);
    } catch (error) {
        console.error("Erro na API:", error);
        return NextResponse.json({ error: "Erro ao buscar dados" }, { status: 500 });
    }
}
