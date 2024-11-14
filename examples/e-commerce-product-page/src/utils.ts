const locale = "en-US";
const currency = "USD";

export const formatCurrency = (number: number) =>
  new Intl.NumberFormat(locale, { style: "currency", currency }).format(number);
