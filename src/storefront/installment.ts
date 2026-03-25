export type InstallmentPlan = {
  termMonths: number;
  monthlyPayment: number;
  upfrontPayment: number;
};

export const getInstallmentPlan = (
  amount?: number | null,
): InstallmentPlan | null => {
  const normalizedAmount = Math.max(0, Math.round(Number(amount || 0)));

  if (!Number.isFinite(normalizedAmount) || normalizedAmount <= 0) {
    return null;
  }

  const termMonths =
    normalizedAmount >= 150000
      ? 18
      : normalizedAmount >= 80000
        ? 12
        : normalizedAmount >= 30000
          ? 9
          : 6;

  return {
    termMonths,
    monthlyPayment: Math.ceil(normalizedAmount / termMonths),
    upfrontPayment: 0,
  };
};
