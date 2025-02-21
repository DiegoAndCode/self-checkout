import { db } from "@/lib/prisma";
//import { promises } from "dns";
import { notFound } from "next/navigation";
//import Image from "next/image";
//import { Button } from "@/components/ui/button";
//import { ChevronLeftIcon, ScrollTextIcon } from "lucide-react";
import RestaurantHeader from "./components/header";

interface RestaurantMenuPageProps {
    params: Promise<{ slug: string }>;
    searchParams: Promise <{ consumptionMethod: string }>;
};

const isConsumptionMethod = (consumptionMethod: string)  => {
    return ["DINE_IN", "TAKEAWAY"].includes(consumptionMethod.toUpperCase()); //toUpperCase para garantir que seja maiusculo
};


const RestaurantMenuPage = async ({params, searchParams}:RestaurantMenuPageProps) => {
    const { slug } = await params;
    const { consumptionMethod } = await searchParams;

    if (!isConsumptionMethod(consumptionMethod)) {
        return notFound();
    }
    const restaurant = await db.restaurant.findUnique({ where: { slug: slug } });
    if (!restaurant) {
        return notFound();
    }

    return (
        <div>
            <RestaurantHeader restaurant={restaurant}/>
        </div>
    )
};
 
export default RestaurantMenuPage ;