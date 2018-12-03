import { validateApiVersion, isVersionDateInTheFuture } from '../../src/utils/validateApiVersion';

describe('Validate the provided API version', () => {
  it('should allow the provided API version', () => {
    expect(validateApiVersion('2018-05-01')).toBe(true);
  });

  it('should throw an error for an invalid format', () => {
    expect(() => {
      validateApiVersion('01-05-20188');
    }).toThrow();
  it('should recognize that the version date is in the past', () => {
    expect(isVersionDateInTheFuture('2018-09-01')).toBe(false);
  });

  it('should recognize that the version date is in the future', () => {
    expect(isVersionDateInTheFuture('2030-12-31')).toBe(true);
  });
});
