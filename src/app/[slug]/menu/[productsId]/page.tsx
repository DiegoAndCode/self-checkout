import { notFound } from "next/navigation";

import { db } from "@/lib/prisma";

import ProductDetails from "./_components/products-details";
import ProductHeader from "./_components/products-header";

interface ProductPageProps {
  params: Promise<{ slug: string; productsId: string }>;
}

export default async function ProductPage ({ params }: ProductPageProps) {
  const { slug, productsId } = await params;

  const product = await db.product.findUnique({
    where: { id: productsId },
    include: {
      restaurant: {
        select: { avatarImageUrl: true, name: true, slug: true },
      },
    },
  });

  if (!product) {
    return notFound();
  }
  if (product.restaurant.slug !== slug) {
    return notFound();
  }

  return (
    <div className="flex h-full flex-col">
      {/* HEADER */}
      <ProductHeader product={product} />
      {/* DETAILS */}
      <ProductDetails product={product} />
    </div>
  );
};