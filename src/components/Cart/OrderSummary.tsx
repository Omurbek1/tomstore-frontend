import { useI18n } from "@/i18n/provider";
import { selectCartTotalPrice, useAppStore } from "@/store/app-store";
import React from "react";

const OrderSummary = () => {
  const cartItems = useAppStore((state) => state.cartItems);
  const totalPrice = useAppStore(selectCartTotalPrice);
  const { t, formatPrice } = useI18n();

  return (
    <div className="lg:max-w-[455px] w-full">
      {/* <!-- order list box --> */}
      <div className="bg-white shadow-1 rounded-[10px]">
        <div className="border-b border-gray-3 py-5 px-4 sm:px-8.5">
          <h3 className="font-medium text-xl text-dark">{t("cart.orderSummary")}</h3>
        </div>

        <div className="pt-2.5 pb-8.5 px-4 sm:px-8.5">
          {/* <!-- title --> */}
          <div className="flex items-center justify-between py-5 border-b border-gray-3">
            <div>
              <h4 className="font-medium text-dark">{t("common.product")}</h4>
            </div>
            <div>
              <h4 className="font-medium text-dark text-right">{t("common.subtotal")}</h4>
            </div>
          </div>

          {/* <!-- product item --> */}
          {cartItems.map((item, key) => (
            <div key={key} className="flex items-center justify-between py-5 border-b border-gray-3">
              <div>
                <p className="text-dark">{item.title}</p>
              </div>
              <div>
                <p className="text-dark text-right">
                  {formatPrice(item.discountedPrice * item.quantity)}
                </p>
              </div>
            </div>
          ))}

          {/* <!-- total --> */}
          <div className="flex items-center justify-between pt-5">
            <div>
              <p className="font-medium text-lg text-dark">{t("common.total")}</p>
            </div>
            <div>
              <p className="font-medium text-lg text-dark text-right">
                {formatPrice(totalPrice)}
              </p>
            </div>
          </div>

          {/* <!-- checkout button --> */}
          <button
            type="submit"
            className="w-full flex justify-center font-medium text-white bg-blue py-3 px-6 rounded-md ease-out duration-200 hover:bg-blue-dark mt-7.5"
          >
            {t("checkout.processToCheckout")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
