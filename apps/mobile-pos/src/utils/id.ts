/**
 * Lightweight unique id generator for client-side mock records
 * (cart line items, sync queue entries, transaction ids). Not
 * cryptographically strong — fine for demo / offline-first mock data.
 */
export function generateId(prefix = "id"): string {
  const random = Math.random().toString(36).slice(2, 10);
  const time = Date.now().toString(36);
  return `${prefix}_${time}${random}`;
}
