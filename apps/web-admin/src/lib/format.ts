/** Formats a number as Indonesian Rupiah, e.g. formatIDR(1250000) -> "Rp1.250.000". */
export function formatIDR(amount: number): string {
  const rounded = Math.round(amount);
  return "Rp" + rounded.toLocaleString("id-ID", { maximumFractionDigits: 0 });
}

/** Compact Rupiah for tight spaces, e.g. formatIDRCompact(125500000) -> "Rp125,5jt". */
export function formatIDRCompact(amount: number): string {
  if (Math.abs(amount) >= 1_000_000_000) {
    return "Rp" + (amount / 1_000_000_000).toLocaleString("id-ID", { maximumFractionDigits: 1 }) + "M";
  }
  if (Math.abs(amount) >= 1_000_000) {
    return "Rp" + (amount / 1_000_000).toLocaleString("id-ID", { maximumFractionDigits: 1 }) + "jt";
  }
  if (Math.abs(amount) >= 1_000) {
    return "Rp" + (amount / 1_000).toLocaleString("id-ID", { maximumFractionDigits: 0 }) + "rb";
  }
  return formatIDR(amount);
}

export function formatNumber(value: number): string {
  return value.toLocaleString("id-ID");
}

export function formatPercent(value: number, digits = 1): string {
  const sign = value > 0 ? "+" : "";
  return `${sign}${value.toFixed(digits)}%`;
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export function formatDateTime(iso: string): string {
  return new Date(iso).toLocaleString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function initials(name: string): string {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}
