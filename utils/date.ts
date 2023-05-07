export function todayMinusKYears(years: number): Date {
  const result = new Date();
  result.setUTCFullYear(result.getUTCFullYear() - years);

  return result;
}
