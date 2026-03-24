"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useI18n } from "@/i18n/provider";

const CounDown = () => {
  const { t } = useI18n();
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [deadline, setDeadline] = useState<number | null>(null);

  const syncTime = (nextDeadline: number) => {
    const time = Math.max(nextDeadline - Date.now(), 0);

    setDays(Math.floor(time / (1000 * 60 * 60 * 24)));
    setHours(Math.floor((time / (1000 * 60 * 60)) % 24));
    setMinutes(Math.floor((time / 1000 / 60) % 60));
    setSeconds(Math.floor((time / 1000) % 60));
  };

  useEffect(() => {
    const nextDeadline = Date.now() + 4 * 24 * 60 * 60 * 1000;
    setDeadline(nextDeadline);
    syncTime(nextDeadline);
  }, []);

  useEffect(() => {
    if (!deadline) {
      return;
    }

    const interval = window.setInterval(() => syncTime(deadline), 1000);

    return () => clearInterval(interval);
  }, [deadline]);

  const timerItems = [
    { value: days, label: t("home.countdownDays") },
    { value: hours, label: t("home.countdownHours") },
    { value: minutes, label: t("home.countdownMinutes") },
    { value: seconds, label: t("home.countdownSeconds") },
  ];

  return (
    <section className="overflow-hidden">
      <div className="mx-auto w-full max-w-[1170px]">
        <div className="section-shell-dark grid gap-8 px-5 py-7 sm:px-8 sm:py-9 lg:grid-cols-[minmax(0,0.95fr)_minmax(340px,0.85fr)] xl:px-10">
          <div className="relative z-10 max-w-[470px]">
            <span className="section-kicker-dark mb-5">
              {t("home.countdownBadge")}
            </span>

            <h2 className="mb-3 text-3xl font-semibold leading-tight text-white sm:text-[42px]">
              {t("home.countdownTitle")}
            </h2>

            <p className="text-sm leading-7 text-white/72 sm:text-base">
              {t("home.countdownText")}
            </p>

            {/* <!-- Countdown timer --> */}
            <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {timerItems.map((item) => (
                <div
                  key={item.label}
                  className="rounded-[22px] border border-white/10 bg-white/8 px-4 py-4 text-center backdrop-blur-sm"
                >
                  <span className="block text-3xl font-semibold text-white">
                    {item.value < 10 ? `0${item.value}` : item.value}
                  </span>
                  <span className="mt-2 block text-[11px] font-semibold uppercase tracking-[0.22em] text-white/48">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>

            <a
              href="/shop-with-sidebar"
              className="mt-8 inline-flex rounded-full bg-white px-7 py-3 text-sm font-medium text-dark transition-all duration-200 hover:-translate-y-0.5 hover:bg-blue hover:text-white"
            >
              {t("home.checkItOut")}
            </a>
          </div>

          <div className="relative min-h-[320px] overflow-hidden rounded-[28px] border border-white/10 bg-white/6">
            <div className="soft-grid absolute inset-0 opacity-15" />
            <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue/20 blur-3xl" />
            <Image
              src="/images/countdown/countdown-01.png"
              alt="product"
              className="absolute bottom-4 left-1/2 h-auto w-auto max-w-[320px] -translate-x-1/2 drop-shadow-[0_30px_50px_rgba(0,0,0,0.32)] sm:max-w-[360px]"
              width={360}
              height={330}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CounDown;
