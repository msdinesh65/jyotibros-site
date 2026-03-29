/** Parse rupee amount from display strings like "₹1,299" */
export function parseRupeeFromDisplay(price: string): number {
  const n = Number(price.replace(/[^0-9.]/g, ''));
  return Number.isNaN(n) ? 0 : n;
}
