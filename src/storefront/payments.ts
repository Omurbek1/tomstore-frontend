export const STOREFRONT_PAYMENT_METHODS = [
  {
    id: "visa_card",
    label: "Visa Card",
  },
  {
    id: "mbank",
    label: "MBank",
  },
  {
    id: "elcard",
    label: "Elcard",
  },
  {
    id: "bitcoin",
    label: "Bitcoin",
  },
  {
    id: "paypal",
    label: "PayPal",
  },
  {
    id: "alipay",
    label: "Alipay",
  },
  {
    id: "bakaibank",
    label: "Bakai Bank",
  },
] as const;

export type StorefrontPaymentMethodId =
  (typeof STOREFRONT_PAYMENT_METHODS)[number]["id"];

export const STOREFRONT_PAYMENT_METHOD_LABELS = STOREFRONT_PAYMENT_METHODS.reduce<
  Record<string, string>
>((accumulator, method) => {
  accumulator[method.id] = method.label;
  return accumulator;
}, {});
