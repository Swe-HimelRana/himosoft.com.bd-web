"use client";

import { useState, type ReactNode } from "react";

import {
  ProductDeploymentModal,
  type ProductDeploymentModalCopy,
} from "@/components/ProductDeploymentModal";

type Product = {
  name: string;
  description: string;
  href: string;
  category: string;
  status: "live" | "comingSoon";
};

type ProductVariant = "brand" | "emerald" | "sky";

type Props = {
  products: {
    modal: ProductDeploymentModalCopy;
    liveLabel: string;
    playProtect: Product;
    mikrotikConnect: Product;
    linuxMirror: Product;
  };
};

type ActiveProduct = {
  key: "playProtect" | "mikrotikConnect";
  variant: ProductVariant;
};

const VARIANT_STYLES: Record<
  ProductVariant,
  {
    card: string;
    gradient: string;
    orb1: string;
    orb2: string;
    icon: string;
    category: string;
    title: string;
    arrow: string;
    liveBadge: string;
  }
> = {
  brand: {
    card: "border-brand/30 hover:border-brand/50 hover:shadow-[0_0_60px_-10px_rgba(102,126,234,0.5)]",
    gradient:
      "bg-gradient-to-br from-brand/40 via-brand/20 to-purple-900/30 group-hover:from-brand/50 group-hover:via-brand/30",
    orb1: "bg-brand/30",
    orb2: "bg-purple-600/30",
    icon: "bg-gradient-to-br from-brand to-purple-600 shadow-brand/40",
    category: "text-brand",
    title: "group-hover:text-brand",
    arrow: "bg-brand/30 text-brand",
    liveBadge: "border-brand/40 bg-brand/20 text-brand",
  },
  emerald: {
    card: "border-emerald-500/30 hover:border-emerald-500/50 hover:shadow-[0_0_60px_-10px_rgba(16,185,129,0.5)]",
    gradient:
      "bg-gradient-to-br from-emerald-500/40 via-emerald-500/20 to-teal-900/30 group-hover:from-emerald-500/50 group-hover:via-emerald-500/30",
    orb1: "bg-emerald-500/30",
    orb2: "bg-teal-600/30",
    icon: "bg-gradient-to-br from-emerald-500 to-teal-600 shadow-emerald-500/40",
    category: "text-emerald-400",
    title: "group-hover:text-emerald-400",
    arrow: "bg-emerald-500/30 text-emerald-400",
    liveBadge: "border-emerald-500/40 bg-emerald-500/20 text-emerald-400",
  },
  sky: {
    card: "border-sky-500/30 hover:border-sky-500/50 hover:shadow-[0_0_60px_-10px_rgba(14,165,233,0.5)]",
    gradient:
      "bg-gradient-to-br from-sky-500/40 via-sky-500/20 to-blue-900/30 group-hover:from-sky-500/50 group-hover:via-sky-500/30",
    orb1: "bg-sky-500/30",
    orb2: "bg-blue-600/30",
    icon: "bg-gradient-to-br from-sky-500 to-blue-600 shadow-sky-500/40",
    category: "text-sky-400",
    title: "group-hover:text-sky-400",
    arrow: "bg-sky-500/30 text-sky-400",
    liveBadge: "border-sky-500/40 bg-sky-500/20 text-sky-400",
  },
};

function ProductCard({
  product,
  variant,
  liveLabel,
  onOpen,
  children,
}: {
  product: Product;
  variant: ProductVariant;
  liveLabel: string;
  onOpen?: () => void;
  children: ReactNode;
}) {
  const styles = VARIANT_STYLES[variant];
  const isLive = product.status === "live";
  const className = `group relative w-full overflow-hidden rounded-2xl border p-6 text-left backdrop-blur-xl transition-all duration-500 ${styles.card}`;

  const content = (
    <>
      <div className={`absolute inset-0 z-0 transition-all duration-500 ${styles.gradient}`} />
      <div className={`absolute -right-6 -top-6 z-0 h-28 w-28 rounded-full blur-2xl ${styles.orb1}`} />
      <div className={`absolute -bottom-3 -left-3 z-0 h-20 w-20 rounded-full blur-xl ${styles.orb2}`} />

      {isLive && (
        <span
          className={`absolute right-5 top-5 z-20 rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider backdrop-blur-sm ${styles.liveBadge}`}
        >
          {liveLabel}
        </span>
      )}

      <div className="relative z-10 flex items-start gap-5">
        <div className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl shadow-xl ${styles.icon}`}>
          {children}
        </div>

        <div className="min-w-0 flex-1">
          <p className={`mb-1 text-[10px] font-bold uppercase tracking-[0.2em] ${styles.category}`}>
            {product.category}
          </p>
          <h3 className={`text-xl font-bold text-white transition-colors ${styles.title}`}>{product.name}</h3>
          <p className="mt-2 text-sm leading-relaxed text-white/70">{product.description}</p>

          <div className="mt-5 grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-white">24/7</div>
              <div className="mt-1 text-[10px] uppercase tracking-wider text-white/50">Support Mindset</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">100%</div>
              <div className="mt-1 text-[10px] uppercase tracking-wider text-white/50">Client‑centric</div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute right-5 top-1/2 z-10 -translate-y-1/2 opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100">
        <span className={`flex h-10 w-10 items-center justify-center rounded-full backdrop-blur-sm ${styles.arrow}`}>
          →
        </span>
      </div>
    </>
  );

  if (isLive) {
    return (
      <a
        href={product.href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
      >
        {content}
      </a>
    );
  }

  return (
    <button type="button" onClick={onOpen} className={className}>
      {content}
    </button>
  );
}

export function NewProductsSection({ products }: Props) {
  const [activeProduct, setActiveProduct] = useState<ActiveProduct | null>(null);

  const selectedName =
    activeProduct?.key === "playProtect"
      ? products.playProtect.name
      : activeProduct?.key === "mikrotikConnect"
        ? products.mikrotikConnect.name
        : "";

  return (
    <>
      <section className="relative overflow-hidden py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            <ProductCard
              product={products.playProtect}
              variant="brand"
              liveLabel={products.liveLabel}
              onOpen={() => setActiveProduct({ key: "playProtect", variant: "brand" })}
            >
              <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                />
              </svg>
            </ProductCard>

            <ProductCard
              product={products.mikrotikConnect}
              variant="emerald"
              liveLabel={products.liveLabel}
              onOpen={() => setActiveProduct({ key: "mikrotikConnect", variant: "emerald" })}
            >
              <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.288 15.038a5.25 5.25 0 017.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 011.06 0z"
                />
              </svg>
            </ProductCard>

            <ProductCard product={products.linuxMirror} variant="sky" liveLabel={products.liveLabel}>
              <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125"
                />
              </svg>
            </ProductCard>
          </div>
        </div>
      </section>

      <ProductDeploymentModal
        open={activeProduct !== null}
        onClose={() => setActiveProduct(null)}
        productName={selectedName}
        variant={activeProduct?.variant === "emerald" ? "emerald" : "brand"}
        copy={products.modal}
      />
    </>
  );
}
