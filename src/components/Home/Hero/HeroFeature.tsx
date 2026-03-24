"use client";

import React from "react";
import Image from "next/image";
import { useI18n } from "@/i18n/provider";

const HeroFeature = () => {
  const { t } = useI18n();
  const featureData = [
    {
      img: "/images/icons/icon-01.svg",
      title: t("home.freeShipping"),
      description: t("home.freeShippingDesc"),
    },
    
    {
      img: "/images/icons/icon-03.svg",
      title: t("home.securePayments"),
      description: t("home.securePaymentsDesc"),
    },
    {
      img: "/images/icons/icon-04.svg",
      title: t("home.support24"),
      description: t("home.support24Desc"),
    },
  ];

  return (
    <div className="grid gap-3 md:grid-cols-3">
        {featureData.map((item, key) => (
          <div
            className="flex items-start gap-4 rounded-[24px] border border-white/10 bg-white/8 px-5 py-4 backdrop-blur-sm"
            key={key}
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/10">
              <Image src={item.img} alt="icons" width={24} height={24} />
            </div>

            <div className="min-w-0">
              <h3 className="text-base font-semibold text-white">{item.title}</h3>
              <p className="mt-1 text-sm leading-6 text-white/62">
                {item.description}
              </p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default HeroFeature;
