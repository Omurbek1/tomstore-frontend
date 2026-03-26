import Image from "next/image";
import type { StorefrontPaymentMethodId } from "@/storefront/payments";

type PaymentMethodBadgeProps = {
  methodId: StorefrontPaymentMethodId;
  label: string;
  variant?: "icon" | "option";
};

const PAYMENT_LOGO_BY_ID: Record<
  StorefrontPaymentMethodId,
  {
    src: string;
    width: number;
    height: number;
  }
> = {
  visa_card: {
    src: "/images/payment/methods/visa-card.svg",
    width: 116,
    height: 44,
  },
  mbank: {
    src: "/images/payment/methods/mbank.svg",
    width: 116,
    height: 44,
  },
  elcard: {
    src: "/images/payment/methods/elcard.svg",
    width: 116,
    height: 44,
  },
  bitcoin: {
    src: "/images/payment/methods/bitcoin.svg",
    width: 116,
    height: 44,
  },
  paypal: {
    src: "/images/payment/methods/paypal.svg",
    width: 116,
    height: 44,
  },
  alipay: {
    src: "/images/payment/methods/alipay.svg",
    width: 116,
    height: 44,
  },
  bakaibank: {
    src: "/images/payment/methods/bakaibank.svg",
    width: 132,
    height: 44,
  },
};

const PaymentMethodBadge = ({
  methodId,
  label,
  variant = "icon",
}: PaymentMethodBadgeProps) => {
  const logo = PAYMENT_LOGO_BY_ID[methodId];

  if (variant === "icon") {
    return (
      <span
        aria-label={label}
        title={label}
        className="inline-flex h-11 items-center justify-center rounded-2xl transition-transform duration-200 hover:-translate-y-0.5"
      >
        <Image
          src={logo.src}
          alt={label}
          width={logo.width}
          height={logo.height}
          className="h-10 w-auto object-contain"
        />
      </span>
    );
  }

  return (
    <div className="flex items-center gap-3 min-w-0">
      <Image
        src={logo.src}
        alt={label}
        width={logo.width}
        height={logo.height}
        className="h-10 w-auto max-w-[132px] shrink-0 object-contain"
      />
    </div>
  );
};

export default PaymentMethodBadge;
