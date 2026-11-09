export function shiftCalendarMonth(month: string, amount: number): string {
  const [year, index] = month.split('-').map(Number);
  return new Date(Date.UTC(year, index - 1 + amount, 1))
    .toISOString()
    .slice(0, 7);
}
