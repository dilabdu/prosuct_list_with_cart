export function calculatePrice(price) {
  const _price = Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);
  return _price;
}
