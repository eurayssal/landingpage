import { Metadata } from "next";
import { getReceita } from "@/services/receitas-service";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const receita = await getReceita(slug);

    if (!receita) {
        return {
            title: "Receita não encontrada",
            description: "A receita que você procurou não existe.",
        };
    }

    return {
        title: receita?.title,
        description: receita?.description,
        openGraph: {
            title: receita?.opengraph?.title || receita?.title,
            description: receita?.opengraph?.description || receita?.description,
            images: [
                {
                    url: receita?.opengraph?.url || "",
                    alt: receita?.opengraph?.alt || "",
                },
            ],
        },
        keywords: receita?.keywords,
        robots: receita?.robots,
    };
}

export default async function ReceitasPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const receita = await getReceita(slug);

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
