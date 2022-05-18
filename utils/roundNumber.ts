/**
 * Roudn number to thousand ("k") or million ("M") notation with one decimal place.
 * If number is less than 1000, it will be returned as is.
 * @example round(5398222) -> "5,4M"
 * @example round(5398) -> "5,4k"
 * @example round(123) -> "123"
 */
export const roundNumber = (d?: number) => {
  if (!d) return "—";

  if (d > 1000000) {
    return `${Math.round((d / 1000000) * 10) / 10}M`;
  } else if (d > 1000) {
    return `${Math.round((d / 1000) * 10) / 10}k`;
  } else {
    return String(d);
  }
};
