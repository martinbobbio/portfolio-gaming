import routeToTag from './routeToTag';
import { expect, test, describe } from 'vitest';

describe('routeToTag', () => {
  test('Should handle first letter uppercase correctly', () => {
    const result = routeToTag('/my-path');
    expect(result).toBe('MY PATH');
  });
});
