export function isNumber(x: unknown): x is number {
  return typeof x === 'number' && Number.isFinite(x);
}

export const parseNumber = (value: string | number) => {
  const numericValue = typeof value === 'number' ? value : parseFloat(value)
  return Number.isNaN(numericValue) ? null : numericValue
}
