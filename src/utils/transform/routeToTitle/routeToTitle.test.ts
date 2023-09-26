import routeToTitle from './routeToTitle';
import { expect, test, describe } from 'vitest';

describe('routeToTitle', () => {
  test('Should handle first letter uppercase correctly', () => {
    const result = routeToTitle('/my-path');
    expect(result).toBe('MY PATH');
  });
});
