const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "Mei",
  "Jun",
  "Jul",
  "Agu",
  "Sep",
  "Okt",
  "Nov",
  "Des",
];

export function formatDateTime(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  const day = d.getDate().toString().padStart(2, "0");
  const month = MONTHS[d.getMonth()];
  const year = d.getFullYear();
  const hours = d.getHours().toString().padStart(2, "0");
  const minutes = d.getMinutes().toString().padStart(2, "0");
  return `${day} ${month} ${year}, ${hours}:${minutes}`;
}

export function formatTime(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  const hours = d.getHours().toString().padStart(2, "0");
  const minutes = d.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
}

export function formatRelative(iso: string): string {
  const d = new Date(iso).getTime();
  if (Number.isNaN(d)) return iso;
  const diffMs = Date.now() - d;
  const diffMin = Math.round(diffMs / 60000);
  if (diffMin < 1) return "Baru saja";
  if (diffMin < 60) return `${diffMin} menit lalu`;
  const diffHour = Math.round(diffMin / 60);
  if (diffHour < 24) return `${diffHour} jam lalu`;
  const diffDay = Math.round(diffHour / 24);
  return `${diffDay} hari lalu`;
}
