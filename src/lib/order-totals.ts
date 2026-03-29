export type LineInput = {
  quantity: number;
  unitPrice: number;
  originalPrice?: number;
};

/**
 * Server-side totals from cart lines (rupees). Do not trust client "total" alone.
 */
export function computeOrderTotalsRupee(lines: LineInput[]) {
  let saleTotal = 0;
  let mrpTotal = 0;
  for (const line of lines) {
    const sale = line.unitPrice * line.quantity;
    saleTotal += sale;
    const mrpUnit = line.originalPrice && line.originalPrice > line.unitPrice
      ? line.originalPrice
      : line.unitPrice;
    mrpTotal += mrpUnit * line.quantity;
  }
  const discountTotal = Math.max(0, mrpTotal - saleTotal);
  return {
    saleTotalRupee: saleTotal,
    mrpTotalRupee: mrpTotal,
    discountTotalRupee: discountTotal
  };
}

export function rupeeToPaise(rupees: number): number {
  return Math.round(rupees * 100);
}
