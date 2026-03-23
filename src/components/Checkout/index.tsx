"use client";
import React from "react";
import Breadcrumb from "../Common/Breadcrumb";
import { useI18n } from "@/i18n/provider";
import { selectTotalPrice } from "@/redux/features/cart-slice";
import { useAppSelector } from "@/redux/store";
import Login from "./Login";
import Shipping from "./Shipping";
import ShippingMethod from "./ShippingMethod";
import PaymentMethod from "./PaymentMethod";
import Coupon from "./Coupon";
import Billing from "./Billing";
import { useSelector } from "react-redux";

const Checkout = () => {
  const { t } = useI18n();
  const cartItems = useAppSelector((state) => state.cartReducer.items);
  const totalPrice = useSelector(selectTotalPrice);

  return (
    <>
      <Breadcrumb title={t("checkout.title")} pages={[t("checkout.title")]} />
      <section className="overflow-hidden py-20 bg-gray-2">
        <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
          <form>
            <div className="flex flex-col lg:flex-row gap-7.5 xl:gap-11">
              {/* <!-- checkout left --> */}
              <div className="lg:max-w-[670px] w-full">
                {/* <!-- login box --> */}
                <Login />

                {/* <!-- billing details --> */}
                <Billing />

                {/* <!-- address box two --> */}
                <Shipping />

                {/* <!-- others note box --> */}
                <div className="bg-white shadow-1 rounded-[10px] p-4 sm:p-8.5 mt-7.5">
                  <div>
                    <label htmlFor="notes" className="block mb-2.5">
                      {t("checkout.otherNotes")}
                    </label>

                    <textarea
                      name="notes"
                      id="notes"
                      rows={5}
                      placeholder={t("checkout.notesPlaceholder")}
                      className="rounded-md border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full p-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20"
                    ></textarea>
                  </div>
                </div>
              </div>

              {/* // <!-- checkout right --> */}
              <div className="max-w-[455px] w-full">
                {/* <!-- order list box --> */}
                <div className="bg-white shadow-1 rounded-[10px]">
                  <div className="border-b border-gray-3 py-5 px-4 sm:px-8.5">
                    <h3 className="font-medium text-xl text-dark">
                      {t("checkout.yourOrder")}
                    </h3>
                  </div>

                  <div className="pt-2.5 pb-8.5 px-4 sm:px-8.5">
                    {/* <!-- title --> */}
                    <div className="flex items-center justify-between py-5 border-b border-gray-3">
                      <div>
                        <h4 className="font-medium text-dark">{t("common.product")}</h4>
                      </div>
                      <div>
                        <h4 className="font-medium text-dark text-right">
                          {t("common.subtotal")}
                        </h4>
                      </div>
                    </div>

                    {cartItems.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between py-5 border-b border-gray-3"
                      >
                        <div>
                          <p className="text-dark">{item.title}</p>
                        </div>
                        <div>
                          <p className="text-dark text-right">
                            ${item.discountedPrice * item.quantity}
                          </p>
                        </div>
                      </div>
                    ))}

                    {/* <!-- product item --> */}
                    <div className="flex items-center justify-between py-5 border-b border-gray-3">
                      <div>
                        <p className="text-dark">{t("checkout.shippingFee")}</p>
                      </div>
                      <div>
                        <p className="text-dark text-right">$0.00</p>
                      </div>
                    </div>

                    {/* <!-- total --> */}
                    <div className="flex items-center justify-between pt-5">
                      <div>
                        <p className="font-medium text-lg text-dark">{t("common.total")}</p>
                      </div>
                      <div>
                        <p className="font-medium text-lg text-dark text-right">
                          ${totalPrice}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* <!-- coupon box --> */}
                <Coupon />

                {/* <!-- shipping box --> */}
                <ShippingMethod />

                {/* <!-- payment box --> */}
                <PaymentMethod />

                {/* <!-- checkout button --> */}
                <button
                  type="submit"
                  className="w-full flex justify-center font-medium text-white bg-blue py-3 px-6 rounded-md ease-out duration-200 hover:bg-blue-dark mt-7.5"
                >
                  {t("checkout.processToCheckout")}
                </button>
              </div>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default Checkout;
