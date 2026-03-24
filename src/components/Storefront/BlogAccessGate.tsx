"use client";

import Breadcrumb from "@/components/Common/Breadcrumb";
import Link from "next/link";

type Props = {
  nextPath: string;
  title?: string;
};

export default function BlogAccessGate({
  nextPath,
  title = "Закрытый блог",
}: Props) {
  return (
    <main>
      <Breadcrumb title={title} pages={[title]} />
      <section className="overflow-hidden bg-gray-2 py-20">
        <div className="mx-auto w-full max-w-[1170px] px-4 sm:px-8 xl:px-0">
          <div className="mx-auto max-w-[760px] rounded-[28px] border border-slate-200 bg-white p-7 shadow-1 sm:p-10">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-900 text-white">
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7 10V8C7 5.23858 9.23858 3 12 3C14.7614 3 17 5.23858 17 8V10"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
                <rect
                  x="5"
                  y="10"
                  width="14"
                  height="11"
                  rx="2"
                  stroke="currentColor"
                  strokeWidth="1.6"
                />
                <path
                  d="M12 14.5V16.5"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            <div className="text-center">
              <div className="text-sm font-semibold uppercase tracking-[0.22em] text-blue">
                CRM Access
              </div>
              <h1 className="mt-3 text-2xl font-semibold text-dark sm:text-[34px]">
                Этот раздел доступен только сотрудникам компании
              </h1>
              <p className="mx-auto mt-4 max-w-[560px] text-base leading-7 text-dark-4">
                Блог переведён в закрытый режим. Войдите под рабочим CRM-аккаунтом
                сотрудника или внутренним аккаунтом компании, и мы вернём вас
                на нужную страницу со статьями.
              </p>

              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <Link
                  href={`/signin?next=${encodeURIComponent(nextPath)}`}
                  className="inline-flex rounded-xl bg-dark px-6 py-3 font-medium text-white transition-colors duration-200 hover:bg-blue"
                >
                  Войти как сотрудник
                </Link>
                <Link
                  href="/"
                  className="inline-flex rounded-xl border border-gray-3 bg-white px-6 py-3 font-medium text-dark transition-colors duration-200 hover:border-blue hover:text-blue"
                >
                  На главную
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
