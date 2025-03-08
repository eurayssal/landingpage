"use client";  // 🔹 Adicionando o "use client" para habilitar o acesso ao `params` no lado do cliente

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

async function fetchReceita(slug: string) {
    const res = await fetch(`/api/receitas/${slug}`);

    if (!res.ok) {
        console.error("Erro ao buscar a receita");
        return null;
    }

    return await res.json();
}

export default function ReceitaPage() {
    const { slug } = useParams();  // Obtém o slug da URL dinamicamente
    const [receita, setReceita] = useState<any>(null);

    useEffect(() => {
        if (slug && typeof slug === "string") {  // Verifica se o slug é uma string
            fetchReceita(slug).then((data) => {
                if (data && !data.error) {
                    setReceita(data);
                }
            });
        }
    }, [slug]);

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
