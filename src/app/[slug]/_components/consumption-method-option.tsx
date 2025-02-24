import { Card, CardContent } from "@/components/ui/card";
import { ConsumptionMethod } from "@prisma/client";

import Image from "next/image";
import Link from "next/link";

interface ConsumptionMethodOptionProps {
    slug: string;
    imageUrl: string;
    imageAlt: string;
    buttonText: string;
    option: ConsumptionMethod;

}

export default function ConsumptionMethodOption(
    { imageUrl, imageAlt, buttonText, option, slug }: ConsumptionMethodOptionProps
) {
    return (
        <Link href={`/${slug}/menu?consumptionMethod=${option}`}>
            <Card className="hover:shadow-lg hover:bg-gray-100">
                <CardContent className="flex flex-col items-center gap-8 py-8">
                    <div className="relative h-[80px] w-[80px]">
                        <Image
                            src={imageUrl}
                            fill
                            alt={imageAlt}
                            className="object-contain" />
                    </div>


                    <p className="font-semibold text-gray-900">
                        {/* //asChild para que o botão fique com o mesmo tamanho do conteudo interno e não exiba o link se não o html reclama */}
                        {buttonText}
                    </p>
                </CardContent>
            </Card>
        </Link>
    );
};