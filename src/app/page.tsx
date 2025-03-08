import { Metadata } from "next";
import { connectToDatabase } from "@/lib/mongodb";

export const metadata: Metadata = {
  title: "Mercado Prisma - O supermercado que entende você!",
  description: "Bem-vindo ao supermercado que entende você! Oferecemos uma ampla variedade de produtos frescos, marcas confiáveis e promoções imperdíveis para facilitar sua vida e cuidar do seu bolso.",
  keywords: "supermercado, mercado, compras, alimentos, bebidas, higiene, limpeza, promoções, ofertas, descontos, economia, qualidade, variedade, marcas, produtos, frescos, confiáveis, prático, rápido, fácil, seguro, online, entrega, grátis, compras, casa, família, amigos, vizinhos, bairro, cidade, região, Brasil, Mercado Prisma",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Home",
    description: "Somos uma empresa compo",
  }
};

export default async function Home() {
  const client = await connectToDatabase();
  const db = client.db('sample_mflix');
  const collection = db.collection("movies");

  const data = await collection.find({})
    .sort({
      metacritic: -1,
    })
    .limit(10)
    .toArray();

  const items = data.map((item) => ({
    _id: item._id.toString(),
    fullplot: item.fullplot,
  }));

  return (
    <div className="">
      <h1>Home</h1>
      <ul>
        {items.map((item) => (
          <li key={item._id}>{item.fullplot}</li>
        ))}
      </ul>
    </div>
  );
}
