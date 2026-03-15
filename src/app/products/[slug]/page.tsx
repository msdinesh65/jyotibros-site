import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductPageClient } from "./ProductPageClient";
import { findProductBySlug } from "../../../data/catalog";

type PageProps = {
  params: { slug: string };
  searchParams: { color?: string };
};

export function generateMetadata({ params }: PageProps): Metadata {
  const product = findProductBySlug(params.slug);

  if (!product) {
    return {
      title: "Product not found | Jyoti & Bros"
    };
  }

  return {
    title: `${product.title} | Jyoti & Bros`,
    description: product.description
  };
}

export default function ProductPage({ params, searchParams }: PageProps) {
  const product = findProductBySlug(params.slug);

  if (!product) {
    notFound();
  }

  return (
    <ProductPageClient
      product={product}
      activeColorId={searchParams.color ?? undefined}
    />
  );
}

