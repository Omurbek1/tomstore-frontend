"use client";

import React from "react";
import QueryStatusCard from "@/components/Common/QueryStatusCard";
import { useI18n } from "@/i18n/provider";
import { useOrdersQuery } from "@/orders/hooks";
import SingleOrder from "./SingleOrder";

const Orders = () => {
  const { t } = useI18n();
  const { data: orders = [], isPending, isError, refetch } = useOrdersQuery();

  return (
    <>
      {isPending && orders.length === 0 ? (
        <QueryStatusCard
          state="loading"
          title={t("order.loading")}
          description={t("common.loadingHint")}
          className="mb-6"
        />
      ) : null}

      {isError && orders.length === 0 ? (
        <QueryStatusCard
          state="error"
          title={t("order.error")}
          description={t("common.errorHint")}
          actionLabel={t("common.retry")}
          onAction={() => {
            void refetch();
          }}
          className="mb-6"
        />
      ) : null}

      <div className="w-full overflow-x-auto">
        <div className="min-w-[770px]">
          {/* <!-- order item --> */}
          {orders.length > 0 && (
            <div className="items-center justify-between py-4.5 px-7.5 hidden md:flex ">
              <div className="min-w-[111px]">
                <p className="text-custom-sm text-dark">{t("order.order")}</p>
              </div>
              <div className="min-w-[175px]">
                <p className="text-custom-sm text-dark">{t("order.date")}</p>
              </div>

              <div className="min-w-[128px]">
                <p className="text-custom-sm text-dark">{t("order.status")}</p>
              </div>

              <div className="min-w-[213px]">
                <p className="text-custom-sm text-dark">{t("order.title")}</p>
              </div>

              <div className="min-w-[113px]">
                <p className="text-custom-sm text-dark">{t("order.total")}</p>
              </div>

              <div className="min-w-[113px]">
                <p className="text-custom-sm text-dark">{t("order.action")}</p>
              </div>
            </div>
          )}
          {orders.length > 0 ? (
            orders.map((orderItem, key) => (
              <SingleOrder key={key} orderItem={orderItem} smallView={false} />
            ))
          ) : (
            <p className="py-9.5 px-4 sm:px-7.5 xl:px-10">
              {t("order.empty")}
            </p>
          )}
        </div>

        {orders.length > 0 &&
          orders.map((orderItem, key) => (
            <SingleOrder key={key} orderItem={orderItem} smallView={true} />
          ))}
      </div>
    </>
  );
};

export default Orders;
