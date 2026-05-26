export function hasFields(item: unknown, fields: readonly string[]): item is Record<string, unknown> {
  return (
    typeof item === "object" &&
    item !== null &&
    fields.every((field) => field in item )
  );
}
