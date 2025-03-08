import { connectToDatabase } from "@/lib/mongodb";

type Params = {
    params: {
        slug: string;
    }
}
export async function GET(req: Request, { params }: Params) {
    const slug = params.slug;

    try {
        const client = await connectToDatabase();
        const db = client.db("landingpagedb");
        const collection = db.collection("recipes");

        const receita = await collection.findOne({ slug });

        if (!receita) {
            return new Response(JSON.stringify({ error: "Receita não encontrada" }), { status: 404 });
        }

        return new Response(JSON.stringify({
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
        }), { status: 200 });
    } catch (error) {
        console.error("Erro ao buscar receita:", error);
        return new Response(JSON.stringify({ error: "Erro ao buscar receita" }), { status: 500 });
    }
}
