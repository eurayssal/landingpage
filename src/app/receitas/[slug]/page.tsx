import { Metadata } from "next";
import { connectToDatabase } from "@/lib/mongodb";

export type Params = {
    params: {
        slug: string;
    };
};

async function getReceita(slug: string) {
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

export async function generateMetadata({ params }: Params): Promise<Metadata> {
    const receita = await getReceita(params.slug);

    if (!receita) {
        return {
            title: "Receita não encontrada",
            description: "A receita que você procurou não existe.",
        };
    }

    return {
        title: receita.title,
        description: receita.description,
        openGraph: {
            title: receita.opengraph?.title || receita.title,
            description: receita.opengraph?.description || receita.description,
            images: [
                {
                    url: receita.opengraph?.url || "",
                    alt: receita.opengraph?.alt || "",
                },
            ],
        },
        keywords: receita.keywords,
        robots: receita.robots,
    };
}

export default async function ReceitaPage({ params }: Params) {
    const receita = await getReceita(params.slug);

    if (!receita) {
        return (
            <div className="container mx-auto p-6">
                <h1 className="text-3xl font-bold">Receita não encontrada</h1>
                <p className="text-gray-700 mt-2">A receita que você procura não está disponível.</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold">{receita.title}</h1>
            <p className="text-gray-700 mt-2">{receita.description}</p>

            <h2 className="text-2xl font-semibold mt-6">Ingredientes</h2>
            <ul className="list-disc list-inside mt-2">
                {receita.ingredients.map((ingrediente: string, index: number) => (
                    <li key={index}>{ingrediente}</li>
                ))}
            </ul>

            <h2 className="text-2xl font-semibold mt-6">Modo de Preparo</h2>
            <p className="mt-2">{receita.method}</p>

            <p className="mt-4">
                <strong>Duração:</strong> {receita.duration} | <strong>Dificuldade:</strong> {receita.difficulty}
            </p>
        </div>
    );
}
