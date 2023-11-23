import randomInt from './randomInt';
import { expect, test, describe } from 'vitest';

describe('randomInt', () => {
  test('Should handle correct value with normal values', () => {
    const result = randomInt(1, 5);
    expect(result).toBeGreaterThanOrEqual(1);
    expect(result).toBeLessThanOrEqual(5);
  });
});
