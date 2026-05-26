export function isValidISODate(dateString: string): boolean {
  const dateOnlyRegex = /^20\d{2}-\d{2}-\d{2}$/;
  const isoZRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/;
  const isoOffsetRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\+\d{2}:\d{2}$/;

  const isCorrectFormat =
    dateOnlyRegex.test(dateString) ||
    isoZRegex.test(dateString) ||
    isoOffsetRegex.test(dateString);

  if (!isCorrectFormat) {
    return false;
  }

  const date = new Date(dateString);

  return !Number.isNaN(date.getTime());
}