"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ChevronLeftIcon, ScrollTextIcon } from "lucide-react";
import { Restaurant } from "@prisma/client";
import { useParams, useRouter } from "next/navigation";


interface RestaurantHeaderProps {
    restaurant: Pick<Restaurant, 'name' | 'coverImageUrl'>;
}

export default function RestaurantHeader ({restaurant}: RestaurantHeaderProps) {
    const { slug } = useParams<{ slug: string }>()
    const router = useRouter();
    
    const handleBackClick = () => router.back();
    const handleOrderClick = () => router.push(`/${slug}/orders`);

    return ( 
        <div className="relative h-[250px] w-full">
                <Button variant="secondary" size="icon" className="absolute top-4 left-4 z-50 rounded-full" onClick={handleBackClick}>
                    <ChevronLeftIcon />
                </Button>
                <Image
                src={restaurant.coverImageUrl}
                alt={restaurant.name}
                fill
                className="object-cover"
                />
                <Button variant="secondary" size="icon" className="absolute top-4 right-4 z-50 rounded-full" onClick={handleOrderClick}>
                    <ScrollTextIcon />
                </Button>
            </div>
     );
}