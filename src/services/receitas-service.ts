import { connectToDatabase } from "@/lib/mongodb";

export async function getReceita(slug: string) {
    try {
        const client = await connectToDatabase();
        const db = client.db("landingpagedb");
        const collection = db.collection("recipes");

        const receita = await collection.findOne({ slug });

        if (!receita) return null;

        return {
            _id: receita._id.toString(),
            name: receita.name,
            slug: receita.slug,
            title: receita.title,
            description: receita.description,
            opengraph: receita.opengraph,
            keywords: receita.keywords,
            robots: receita.robots,
            ingredients: receita.ingredients,
            method: receita.method,
            duration: receita.duration,
            difficulty: receita.difficulty,
        };
    } catch (error) {
        console.error("Erro ao buscar receita:", error);
        return null;
    }
}