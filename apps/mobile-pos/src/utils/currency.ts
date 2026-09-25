/**
 * Formats a number as Indonesian Rupiah, e.g. 1250000 -> "Rp1.250.000".
 * Uses a dot as the thousands separator and never shows decimals.
 */
export function formatRupiah(amount: number): string {
  const rounded = Math.round(Number.isFinite(amount) ? amount : 0);
  const isNegative = rounded < 0;
  const abs = Math.abs(rounded);
  const withSeparators = abs.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return `${isNegative ? "-" : ""}Rp${withSeparators}`;
}

export function formatNumber(amount: number): string {
  return Math.round(amount)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}
