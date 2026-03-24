"use client";

import React from "react";
import Image from "next/image";
import { useI18n } from "@/i18n/provider";

const Newsletter = () => {
  const { t } = useI18n();

  return (
    <section className="overflow-hidden">
      <div className="mx-auto max-w-[1170px]">
        <div className="section-shell-dark px-4 py-8 sm:px-8 xl:px-10">
          <Image
            src="/images/shapes/newsletter-bg.jpg"
            alt="background illustration"
            className="absolute inset-0 -z-10 h-full w-full object-cover opacity-[0.08]"
            width={1170}
            height={200}
          />
          <div className="absolute right-0 top-0 -z-10 h-full w-full max-w-[523px] bg-gradient-1 opacity-60"></div>

          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-[491px] w-full">
              <span className="section-kicker-dark mb-5">
                TOMSTORE
              </span>
              <h2 className="mb-3 max-w-[440px] text-white font-semibold text-2xl sm:text-[34px] sm:leading-tight">
                {t("home.newsletterTitle")}
              </h2>
              <p className="text-white/70">
                {t("home.newsletterText")}
              </p>
            </div>

            <div className="max-w-[477px] w-full">
              <form>
                <div className="flex flex-col sm:flex-row gap-4">
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder={t("home.enterEmail")}
                    className="w-full rounded-full border border-white/12 bg-white/8 px-5 py-3 text-white outline-none placeholder:text-white/45"
                  />
                  <button
                    type="submit"
                    className="inline-flex justify-center rounded-full bg-white px-7 py-3 font-medium text-dark transition-all duration-200 hover:-translate-y-0.5 hover:bg-blue hover:text-white"
                  >
                    {t("home.subscribe")}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
