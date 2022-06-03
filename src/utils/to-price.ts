/** Function will convert any number into a currency string. */
const toPrice = (value: number): string => {
  return `$ ${Math.trunc(value)
    .toString()
    .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}`;
};

export default toPrice;
