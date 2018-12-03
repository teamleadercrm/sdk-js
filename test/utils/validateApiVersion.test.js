import { validateApiVersion, isVersionDateInTheFuture } from '../../src/utils/validateApiVersion';

describe('Validate the provided API version', () => {
  it('should allow the provided API version', () => {
    expect(validateApiVersion('2018-05-01')).toBe(true);
  });

  it('should throw an error for an invalid format', () => {
    expect(() => {
      validateApiVersion('01-05-20188');
    }).toThrowError(
      'The provided API version is not in the right format. Please provide the API version in the yyyy-mm-dd format.',
    );
  });

  it('should throw an error because the date is in the future', () => {
    expect(() => {
      validateApiVersion('2030-01-01');
    }).toThrowError('The provided API version date is in the future. Please provide an API version from the past.');
  });

  it('should recognize that the version date is in the past', () => {
    expect(isVersionDateInTheFuture('2018-09-01')).toBe(false);
  });

  it('should recognize that the version date is in the future', () => {
    expect(isVersionDateInTheFuture('2030-12-31')).toBe(true);
  });
});
