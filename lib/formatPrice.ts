export const formatIndianPrice = (price: number) => {
  const priceWithDecimals = price.toFixed(2);

  // Split the number into whole and decimal parts
  const [wholePart, decimalPart] = priceWithDecimals.split(".");

  // Convert to string and split into array of characters
  const digits = wholePart.split("");

  // Start from the right, leave last 3 digits, then group by 2
  const formattedWholePart = digits.reverse().reduce((acc, digit, i) => {
    if (i === 0) return digit;
    if (i === 1) return digit + acc;
    if (i === 2) return digit + acc;
    if ((i - 3) % 2 === 0) return digit + "," + acc;
    return digit + acc;
  }, "");

  return `₹${formattedWholePart}.${decimalPart}`;
};
