import Image from "next/image";
import { notFound } from "next/navigation";

import { db } from "@/lib/prisma";
import ConsumptionMethodOption from "./components/consumption-method-option";

interface RestaurantPageProps {
    params: Promise<{ slug: string }>;
}

export default async function RestaurantPage({params}: RestaurantPageProps) {
    const { slug } = await params;
   const restaurant = await db.restaurant.findUnique({ where: { slug } });
   if (!restaurant) {
     return notFound(); // 404 caso não encontre 
   }
    return ( 
        <div className="flex h-screen flex-col items-center justify-center px-6 pt-24">
        <div className="flex flex-col items-center gap-2">
            <Image
            src={restaurant.avatarImageUrl}
            alt={restaurant.name}
            width={82}
            height={82}
            />
        {/* por se tratar de imagens vindas como link do banco preciso informar que é confiavel ao next (arquivo next.config.ts) */}
            <h2 className="fonts-semibold">
                {restaurant.name}
            </h2>
        </div>
        {/* //espacamento vertical */}
        <div className="pt-24 text-center space-y-2"> 
            <h3 className="text-2xl font-semibold">
                Seja bem-vindo ao {restaurant.name}
            </h3>
            <div className="opacity-55">
                Escolha como prefere aproveitar sua refeição. Estamos oferencendo praticidade e sabor em cada detalhe!
            </div>
        </div>
        <div className="pt-14 grid gap-4 grid-cols-2">
           <ConsumptionMethodOption
                slug={slug}
                imageUrl="/dine_in.png"
                imageAlt="Comer aqui"
                buttonText="Para Comer Aqui"
                option="DINE_IN"
                />
                
        <ConsumptionMethodOption
            slug={slug}
            imageUrl="/takeaway.png"
            imageAlt="Takeaway"
            buttonText="Para Levar"
            option="TAKEAWAY"
            />

        </div>
    </div>
    );
};

 
//server componentes que se renderizam no servidor

//podem ser async - que significa que podem fazer chamadas a apis externas
//recebem um objeto com os parametros da rota , podem chamar recursos do backend (banco de dados, apis externas, etc)
//não pode usar hooks do react
//não pode usar componentes de estado
//não pode usar componentes de efeito