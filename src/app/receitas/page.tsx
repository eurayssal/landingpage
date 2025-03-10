import Image from "next/image";

export default function ReceitaPage() {
    return (
        <div>
            <h1>Receita página inicial</h1>
            <div>
                <Image src={'../../public/vercel.svg'} alt={"vercel"} width={100} height={100} />
                <h2>Receita 1</h2>
                <p>Descrição da receita 1</p>
            </div>
        </div>
    );
}