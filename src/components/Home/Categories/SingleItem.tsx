import { Category } from "@/types/category";
import React from "react";
import Image from "next/image";
import Link from "next/link";

const SingleItem = ({ item }: { item: Category }) => {
  return (
    <Link
      href={item.slug ? `/shop-with-sidebar?category=${item.slug}` : "/shop-with-sidebar"}
      className="group block h-full px-1"
    >
      <div className="h-full rounded-[24px] border border-white/80 bg-[linear-gradient(180deg,#ffffff_0%,#f2f6ff_100%)] px-4 py-5 text-center shadow-[0_24px_44px_-34px_rgba(15,23,42,0.35)] transition-all duration-300 group-hover:-translate-y-1 group-hover:border-blue/15 group-hover:shadow-[0_30px_64px_-34px_rgba(60,80,224,0.28)]">
        <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-[22px] bg-white shadow-[0_20px_40px_-28px_rgba(15,23,42,0.28)]">
          <Image src={item.img} alt={item.title} width={74} height={56} className="h-auto w-auto object-contain" />
        </div>

        <div className="flex justify-center">
          <h3 className="inline-block text-center font-semibold text-dark transition-colors duration-300 group-hover:text-blue">
            {item.title}
          </h3>
        </div>

        {item.totalProducts ? (
          <p className="mt-2 text-xs font-medium uppercase tracking-[0.2em] text-dark-4">
            {item.totalProducts}
          </p>
        ) : null}
      </div>
    </Link>
  );
};

export default SingleItem;
