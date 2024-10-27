export class PriceFormatter {
  static formatPrice(price: number): string {
    const priceString = price.toString();
    return priceString.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }
}
