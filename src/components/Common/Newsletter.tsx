"use client";

import React from "react";
import Image from "next/image";
import { useI18n } from "@/i18n/provider";
import { useStorefrontContact } from "@/storefront/contact-context";

const InstagramIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M8.75 3.25H15.25C18.2876 3.25 20.75 5.71243 20.75 8.75V15.25C20.75 18.2876 18.2876 20.75 15.25 20.75H8.75C5.71243 20.75 3.25 18.2876 3.25 15.25V8.75C3.25 5.71243 5.71243 3.25 8.75 3.25Z"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <path
      d="M8.5 12C8.5 10.067 10.067 8.5 12 8.5C13.933 8.5 15.5 10.067 15.5 12C15.5 13.933 13.933 15.5 12 15.5C10.067 15.5 8.5 13.933 8.5 12Z"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <path
      d="M16.875 7.125H16.884"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const TikTokIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M13.25 4.25C13.25 7.56371 15.9363 10.25 19.25 10.25"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
    />
    <path
      d="M13.25 4.25V14.125C13.25 16.5412 11.2912 18.5 8.875 18.5C6.45875 18.5 4.5 16.5412 4.5 14.125C4.5 11.7088 6.45875 9.75 8.875 9.75C9.66129 9.75 10.3991 9.95762 11.037 10.3207"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M13.25 7C14.0847 8.43453 15.6439 9.375 17.4375 9.375"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
    />
  </svg>
);

const FacebookIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M13.25 20.75V13.25H15.75L16.125 10.25H13.25V8.375C13.25 7.50652 13.4918 6.875 14.7375 6.875H16.25V4.1875C15.9869 4.15277 15.0828 4.0625 14.0312 4.0625C11.835 4.0625 10.3125 5.40359 10.3125 7.86797V10.25H7.75V13.25H10.3125V20.75H13.25Z"
      fill="currentColor"
    />
  </svg>
);

const MapsIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M12 21C15.5 17.4 18.75 14.1738 18.75 10.5C18.75 6.77208 15.7279 3.75 12 3.75C8.27208 3.75 5.25 6.77208 5.25 10.5C5.25 14.1738 8.5 17.4 12 21Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    <path
      d="M12 12.75C13.2426 12.75 14.25 11.7426 14.25 10.5C14.25 9.25736 13.2426 8.25 12 8.25C10.7574 8.25 9.75 9.25736 9.75 10.5C9.75 11.7426 10.7574 12.75 12 12.75Z"
      stroke="currentColor"
      strokeWidth="1.5"
    />
  </svg>
);

const TwoGisIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M5.25 7.5C5.25 5.84315 6.59315 4.5 8.25 4.5H15.75C17.4069 4.5 18.75 5.84315 18.75 7.5V13.25C18.75 14.9069 17.4069 16.25 15.75 16.25H11.2803L7.75628 19.1829C7.10496 19.7245 6.125 19.2614 6.125 18.4143V16.25H8.25C6.59315 16.25 5.25 14.9069 5.25 13.25V7.5Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    <path
      d="M8.375 10.875C8.375 9.21715 9.71715 7.875 11.375 7.875H12.875C14.5329 7.875 15.875 9.21715 15.875 10.875C15.875 12.5329 14.5329 13.875 12.875 13.875H8.375V10.875Z"
      stroke="currentColor"
      strokeWidth="1.5"
    />
  </svg>
);

const Newsletter = () => {
  const { t } = useI18n();
  const {
    companyName,
    facebookUrl,
    instagramUrl,
    mapUrl,
    tiktokUrl,
    twoGisUrl,
  } = useStorefrontContact();
  const googleMapsUrl = mapUrl && !/2gis/i.test(mapUrl) ? mapUrl : undefined;
  const twoGisResolvedUrl =
    twoGisUrl || (mapUrl && /2gis/i.test(mapUrl) ? mapUrl : undefined);
  const socialLinks = [
    {
      accentClassName:
        "border-pink-400/20 bg-[linear-gradient(135deg,rgba(244,114,182,0.16)_0%,rgba(251,191,36,0.14)_100%)] text-pink-100",
      href: instagramUrl,
      hint: t("home.socialInstagramHint"),
      icon: <InstagramIcon />,
      label: t("home.socialInstagram"),
    },
    {
      accentClassName: "border-white/12 bg-white/6 text-white/92",
      href: tiktokUrl,
      hint: t("home.socialTikTokHint"),
      icon: <TikTokIcon />,
      label: t("home.socialTikTok"),
    },
    {
      accentClassName:
        "border-sky-400/20 bg-[linear-gradient(135deg,rgba(56,189,248,0.16)_0%,rgba(59,130,246,0.12)_100%)] text-sky-100",
      href: facebookUrl,
      hint: t("home.socialFacebookHint"),
      icon: <FacebookIcon />,
      label: t("home.socialFacebook"),
    },
    {
      accentClassName:
        "border-emerald-400/20 bg-[linear-gradient(135deg,rgba(16,185,129,0.16)_0%,rgba(34,197,94,0.12)_100%)] text-emerald-100",
      href: googleMapsUrl,
      hint: t("home.socialGoogleMapsHint"),
      icon: <MapsIcon />,
      label: t("home.socialGoogleMaps"),
    },
    {
      accentClassName:
        "border-lime-400/20 bg-[linear-gradient(135deg,rgba(132,204,22,0.16)_0%,rgba(74,222,128,0.12)_100%)] text-lime-100",
      href: twoGisResolvedUrl,
      hint: t("home.socialTwoGisHint"),
      icon: <TwoGisIcon />,
      label: t("home.socialTwoGis"),
    },
  ];

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
          <div className="absolute right-0 top-0 -z-10 h-full w-full max-w-[523px] bg-gradient-1 opacity-60" />

          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-[491px] w-full">
              <span className="section-kicker-dark mb-5">{companyName}</span>
              <h2 className="mb-3 max-w-[440px] text-2xl font-semibold text-white sm:text-[34px] sm:leading-tight">
                {t("home.newsletterTitle")}
              </h2>
              <p className="text-white/70">{t("home.newsletterText")}</p>
            </div>

            <div className="max-w-[520px] w-full">
              <form>
                <div className="flex flex-col gap-4 sm:flex-row">
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

              <div className="mt-5 rounded-[28px] border border-white/10 bg-white/[0.04] p-4 shadow-[0_24px_60px_-40px_rgba(15,23,42,0.65)] backdrop-blur-sm">
                <div className="mb-4 flex flex-col gap-1">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/45">
                    {t("home.newsletterSocialEyebrow")}
                  </span>
                  <p className="text-sm leading-6 text-white/70">
                    {t("home.newsletterSocialText")}
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
                  {socialLinks.map((item) => {
                    const content = (
                      <>
                        <div className="flex items-start justify-between gap-3">
                          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-current/15 bg-white/10">
                            {item.icon}
                          </span>
                          <span
                            className={`rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] ${
                              item.href
                                ? "bg-white/12 text-white/80"
                                : "bg-white/8 text-white/40"
                            }`}
                          >
                            {item.href
                              ? t("home.socialOpen")
                              : t("home.socialSoon")}
                          </span>
                        </div>

                        <div className="mt-4">
                          <p className="text-sm font-semibold text-white">
                            {item.label}
                          </p>
                          <p className="mt-1 text-xs leading-5 text-white/65">
                            {item.hint}
                          </p>
                        </div>
                      </>
                    );

                    if (item.href) {
                      return (
                        <a
                          key={item.label}
                          href={item.href}
                          target="_blank"
                          rel="noreferrer"
                          className={`rounded-[24px] border p-4 transition-all duration-200 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.08] ${item.accentClassName}`}
                        >
                          {content}
                        </a>
                      );
                    }

                    return (
                      <div
                        key={item.label}
                        className={`rounded-[24px] border p-4 opacity-80 ${item.accentClassName}`}
                      >
                        {content}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
