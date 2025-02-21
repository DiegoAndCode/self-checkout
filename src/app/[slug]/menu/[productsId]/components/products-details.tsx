"use client";

import { Prisma } from "@prisma/client";
import { ChefHatIcon, ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { formatCurrency } from "@/helpers/format-currency";

interface ProductDetailsProps {
  product: Prisma.ProductGetPayload<{
    include: {
      restaurant: {
        select: {
          name: true;
          avatarImageUrl: true;
        };
      };
    };
  }>;
}

export default function ProductDetails({ product }: ProductDetailsProps) {
  const [quantity, setQuantity] = useState<number>(1);

  // Função para diminuir a quantidade
  const handleDecreaseQuantity = () => {
    setQuantity((prev) => {
      if (prev === 1) return 1;
      return prev - 1;
    });
  };

  // Função para aumentar a quantidade
  const handleIncreaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  return (
    <div className="relative z-50 rounded-t-3xl mt-[-1.5rem] p-5 flex-auto flex flex-col overflow-hidden">
      <div className="flex-auto">
        {/* IMAGEM E NOME DO RESTAURANTE */}
        <div className="flex items-center gap-1.5 pt-2">
          <Image
            src={product.restaurant.avatarImageUrl}
            alt={product.restaurant.name}
            width={16}
            height={16}
            className="rounded-full"
          />
          <p className="text-xs text-muted-foreground">
            {product.restaurant.name}
          </p>
        </div>

        {/* NOME DO PRODUTO */}
        <h2 className="mt-1 text-xl font-semibold">{product.name}</h2>

        {/* PREÇO DO PRODUTO */}
        <div className="flex items-center justify-between mt-3">
          <h3 className="text-xl font-semibold">
            {formatCurrency(product.price)}
          </h3>
          {/* BOTAO DE QUANTIDADE */}
          <div className="flex items-center gap-3 text-center">
            {/* ESQUERDA */}
            <Button
              variant="outline"
              className="h-8 w-8 rounded-xl"
              onClick={handleDecreaseQuantity}
            >
              <ChevronLeftIcon />
            </Button>
            <p className="w-4">{quantity}</p>
            {/* DIREITA */}
            <Button
              variant="destructive"
              className="h-8 w-8 rounded-xl"
              onClick={handleIncreaseQuantity}
            >
              <ChevronRightIcon />
            </Button>
          </div>
        </div>

        <ScrollArea className="h-full">
          {/* SOBRE */}
          <div className="mt-6 space-y-3">
            <h4 className="font-semibold">Sobre</h4>
            <p className="text-sm text-muted-foreground">
              {product.description}
            </p>
          </div>

          {/* INGREDIENTES */}
          <div className="mt-6 space-y-3">
            <div className="5 flex items-center gap-1">
              <ChefHatIcon size={18} />
              <h4 className="font-semibold">Ingredientes</h4>
            </div>
            <ul className="list-disc px-5 text-sm text=muted-foreground">
              {product.ingredients.map((ingredient) => (
                <li key={ingredient} className="text-sm text-muted-foreground">
                  {ingredient}
                </li>
              ))}
            </ul>
          </div>
        </ScrollArea>
      </div>

      {/* BOTAO DE ADICIONAR À SACOLA */}
      <Button className="w-full rounded-full" variant="default">
        Adicionar à sacola
      </Button>
    </div>
  );
};