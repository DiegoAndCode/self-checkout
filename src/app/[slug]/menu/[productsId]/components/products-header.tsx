"use client";

import { ChevronLeftIcon, ScrollTextIcon } from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

interface ProductHeaderProps {
  product: {
    imageUrl: string;
    name: string;
  };
}

export default function ProductHeader ({ product }: ProductHeaderProps) {
  const { slug } = useParams<{ slug: string }>()
  const router = useRouter();

  const handleBackClick = () => router.back();
  const handleOrderClick = () => router.push(`/${slug}/orders`)

  return (
    <>
      {/* BOTÃO */}
      <div className="relative w-full min-h-[300px]">
        <Button variant="secondary" size="icon" className="absolute top-4 left-4 rounded-full z-50"
          onClick={handleBackClick}
        >
          <ChevronLeftIcon />
        </Button>
        <Button variant="secondary" size="icon" className="absolute right-4 top-4 rounded-full z-50" 
          onClick={handleOrderClick}
        >
          <ScrollTextIcon />
        </Button>
        {/* IMAGEM */}
        <Image
          src={product.imageUrl}
          alt={product.name}
          layout="fill"
          objectFit="cover" 
        />
      </div>
    </>
  );
};