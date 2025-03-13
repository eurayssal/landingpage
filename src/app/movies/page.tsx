"use client";

import { useEffect, useState } from "react";

export const revalidate = 60;

export default function Home() {
    const [items, setItems] = useState<{ _id: string; fullplot: string }[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch("/api/movies", {
                    cache: 'force-cache',
                    next: {
                        revalidate: 60,
                    }
                });

                if (!response.ok) {
                    throw new Error(`Erro na API: ${response.status}`);
                }

                const data = await response.json();
                setItems(Array.isArray(data) ? data : []);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, []);

    if (loading) return <p>Carregando...</p>;
    if (error) return <p>Erro: {error}</p>;

    return (
        <div className="bg-green">
            <h1>Home</h1>
            <ul>
                {items.length > 0 ? (
                    items.map((item) => <li key={item._id}>{item.fullplot}</li>)
                ) : (
                    <p>Nenhum dado encontrado.</p>
                )}
            </ul>
        </div>
    );
}
