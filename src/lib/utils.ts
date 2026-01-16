export function isNumber(x: unknown): x is number {
  return typeof x === 'number' && Number.isFinite(x);
}

export function roundTowards0(num: number): number {
  return num < 0 ? Math.ceil(num) : Math.floor(num)
}

export const parseNumber = (value: string | number) => {
  const numericValue = typeof value === 'number' ? value : parseFloat(value)
  return Number.isNaN(numericValue) ? null : numericValue
}
