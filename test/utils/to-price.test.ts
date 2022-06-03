import toPrice from '@app-utils/to-price';

describe('Utils - To Price', () => {
  it('should transform the number into a currency string', () => {
    const price = toPrice(123456789);
    expect(price).toBe('$ 123.456.789');
  });

  it('should transform the number into a currency string and remove decimals', () => {
    const price = toPrice(123456789.12);
    expect(price).toBe('$ 123.456.789');
  });

  it('should transform the negative number into a currency string', () => {
    const price = toPrice(-123456789);
    expect(price).toBe('$ -123.456.789');
  });
});
