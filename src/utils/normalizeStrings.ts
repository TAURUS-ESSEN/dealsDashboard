export const normalizeStrings = (value: unknown, options?: { lower?: boolean; upper?: boolean }): string | null => {
  const cleared = String(value).trim();
  if (cleared === "") return null;
  if (options?.lower) return cleared.toLowerCase();
  if (options?.upper) return cleared.toUpperCase();
  return cleared;
};
