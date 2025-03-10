'use client';
import { useState, useEffect } from "react";
import { Metadata } from "next"

//Não é possível importar o Metadata de next, pois use client não suporta
// export const metadata: Metadata = {
//     title: "Ofertas",
//     description: "Aqui você encontra as melhores ofertas do Mercado Prisma. Economize com nossas promoções imperdíveis!",
//     keywords: "supermercado, mercado, compras, alimentos, bebidas, higiene, limpeza, promoções, ofertas, descontos, economia, qualidade, variedade, marcas, produtos, frescos, confiáveis, prático, rápido, fácil, seguro, online, entrega, grátis, compras, casa, família, amigos, vizinhos, bairro, cidade, região, Brasil, Mercado Prisma",
//     robots: {
//         index: true,
//         follow: true
//     },
//     openGraph: {
//         title: "Ofertas",
//         description: "Aqui você encontra as melhores ofertas do Mercado Prisma. Economize com nossas promoções imperdíveis!"
//     }
// }

export default function OfertasPage() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetch('https://dummyjson.com/posts')
            .then(response => response.json())
            .then(data => setPosts(data.posts));
    }, []);
    return (
        <div>
            <h1>Ofertas</h1>
            <div>
                {posts.map((post: any, index) => (
                    <div key={index}>
                        <h2>{post.title}</h2>
                        <p>{post.body}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}