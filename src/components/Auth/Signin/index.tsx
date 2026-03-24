"use client";

import Breadcrumb from "@/components/Common/Breadcrumb";
import { useI18n } from "@/i18n/provider";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";

const Signin = () => {
  const { t } = useI18n();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [errorText, setErrorText] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const nextPath = searchParams.get("next") || "/";

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorText(null);
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/storefront-auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          login,
          password,
        }),
      });
      const payload = (await response.json().catch(() => null)) as
        | { message?: string }
        | null;

      if (!response.ok) {
        setErrorText(payload?.message || "Не удалось выполнить вход");
        return;
      }

      router.push(nextPath);
      router.refresh();
    } catch {
      setErrorText("Не удалось выполнить вход");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Breadcrumb title={t("menu.signin")} pages={[t("menu.signin")]} />
      <section className="overflow-hidden py-20 bg-gray-2">
        <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
          <div className="max-w-[570px] w-full mx-auto rounded-xl bg-white shadow-1 p-4 sm:p-7.5 xl:p-11">
            <div className="text-center mb-11">
              <h2 className="font-semibold text-xl sm:text-2xl xl:text-heading-5 text-dark mb-1.5">
                {t("auth.staffSigninTitle")}
              </h2>
              <p>{t("auth.staffSigninIntro")}</p>
            </div>

            <div>
              <form onSubmit={handleSubmit}>
                <div className="mb-5">
                  <label htmlFor="login" className="block mb-2.5">
                    {t("auth.staffLoginLabel")}
                  </label>

                  <input
                    type="text"
                    name="login"
                    id="login"
                    value={login}
                    onChange={(event) => setLogin(event.target.value)}
                    placeholder={t("auth.staffLoginLabel")}
                    className="rounded-lg border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full py-3 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20"
                  />
                </div>

                <div className="mb-5">
                  <label htmlFor="password" className="block mb-2.5">
                    {t("auth.password")}
                  </label>

                  <input
                    type="password"
                    name="password"
                    id="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder={t("auth.enterPassword")}
                    autoComplete="on"
                    className="rounded-lg border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full py-3 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20"
                  />
                </div>

                {errorText ? (
                  <div className="mb-5 rounded-lg border border-red/20 bg-red/5 px-4 py-3 text-sm text-red">
                    {errorText}
                  </div>
                ) : null}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex justify-center font-medium text-white bg-dark py-3 px-6 rounded-lg ease-out duration-200 hover:bg-blue mt-7.5"
                >
                  {isSubmitting ? "Входим..." : t("auth.staffSigninButton")}
                </button>

                <p className="mt-6 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-center text-sm leading-6 text-slate-600">
                  {t("auth.staffSigninNote")}
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Signin;
