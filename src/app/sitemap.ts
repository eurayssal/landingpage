// import { MetadataRoute } from "next";
// import { getRecipes } from "../../data/receitas";

// const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

// export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
//     const allReceitas = await getRecipes();

//     const receitasPages = allReceitas.map((receita) => ({
//         url: `${baseUrl}/receitas/${receita.slug}`,
//         lastModified: receita.published_at,
//         changeFrequencyuency: "weekly",
//         priority: 1,
//     }));

//     return [

//         { url: `${baseUrl}/`, changeFrequency: "yearly", priority: 1 },
//         { url: `${baseUrl}/lojas`, changeFrequency: "monthly", priority: 0.9 },
//         { url: `${baseUrl}/ofertas`, changeFrequency: "monthly", priority: 0.9 },
//         ...receitasPages,
//     ]
// }