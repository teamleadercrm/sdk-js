import { isValidDate } from '../../src/utils/validateDate';

describe('Test the date validator', () => {
  it('should validate the format of the provided date as true', () => {
    expect(isValidDate('2019-01-01')).toBe(true);
  });

  it('should validate the format of the provided date as false', () => {
    expect(isValidDate('01-01-2019')).toBe(false);
  });
});
