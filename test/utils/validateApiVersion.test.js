import validateApiVersion from '../../src/utils/validateApiVersion';

describe('Validate the provided API version', () => {
  it('should allow the provided API version', () => {
    expect(validateApiVersion('2018-05-01')).toBe(true);
  });

  it('should throw an error for an invalid format', () => {
    expect(() => {
      validateApiVersion('01-05-20188');
    }).toThrow();
  });
});
