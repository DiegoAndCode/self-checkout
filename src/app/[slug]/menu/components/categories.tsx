"use client"

import { Prisma } from "@prisma/client";
import { ClockIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

import Products from "./products";

interface RestaurantCategoriesProps {
  restaurant: Prisma.RestaurantGetPayload<{
    include: {
      menuCategories: {
        include: { products: true };
      };
    };
  }>;
}

type MenuCategoryWithProducts = Prisma.MenuCategoryGetPayload<{
  include: { products: true };
}>

export default function RestaurantCategories({ restaurant }: RestaurantCategoriesProps) {

  const [selectedCategory, setSelectedCategory] = useState<MenuCategoryWithProducts>(restaurant.menuCategories[0]);

  const handleCategoryClick = (category: MenuCategoryWithProducts) => {
    setSelectedCategory(category);
  };

  const getCategoryButtonVariant = (category: MenuCategoryWithProducts) => {
    return selectedCategory.id === category.id ? "default" : "secondary";
  }
  return (
    <div className="relative z-50 mt-[-1.5rem] rounded-t-3xl border bg-white p-5">
      {/* LOGO AND DESCRIPTION */}
      <div className="px-5 py-3">
        <div className="flex items-center gap-3">
          <Image
            src={restaurant.avatarImageUrl}
            alt={restaurant.name}
            width={45}
            height={45}
          />
          <div>
            <h2 className="text-lg font-semibold">{restaurant.name}</h2>
            <p className="text-xs text-gray-500">{restaurant.description}</p>
          </div>
        </div>
        {/* OPEN TOAST */}
        <div className="flex items-center gap-1 text-xs text-green-500 mt-3">
          <ClockIcon size={12} />
          <p> Aberto agora! </p>
        </div>
      </div>
      {/* SCROLL */}
      <ScrollArea className="w-full">
        <div className="flex w-max space-x-4 px-5 py-3 border-t">
          {restaurant.menuCategories.map(category => (
            <Button onClick={() => handleCategoryClick(category)} key={category.id} variant={getCategoryButtonVariant(category)} size="sm" className="rounded-full">
              {category.name}
            </Button>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>

      <h3 className="px-5 pt-2 font-semibold">{selectedCategory.name}</h3>

      <Products products={selectedCategory.products} />
    </div>
  );
};