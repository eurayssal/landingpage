import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Ofertas",
    description: "Aqui você encontra as melhores ofertas do Mercado Prisma. Economize com nossas promoções imperdíveis!",
    keywords: "supermercado, mercado, compras, alimentos, bebidas, higiene, limpeza, promoções, ofertas, descontos, economia, qualidade, variedade, marcas, produtos, frescos, confiáveis, prático, rápido, fácil, seguro, online, entrega, grátis, compras, casa, família, amigos, vizinhos, bairro, cidade, região, Brasil, Mercado Prisma",
    robots: {
        index: true,
        follow: true
    },
    openGraph: {
        title: "Ofertas",
        description: "Aqui você encontra as melhores ofertas do Mercado Prisma. Economize com nossas promoções imperdíveis!"
    }
}

export default function OfertasPage() {
    return (
        <div>
            <h1>Ofertas</h1>
        </div>
    )
}