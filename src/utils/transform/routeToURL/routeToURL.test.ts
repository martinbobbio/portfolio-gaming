import routeToURL from './routeToURL';
import { expect, test, describe } from 'vitest';

describe('routeToURL', () => {
  test('Should handle first letter uppercase correctly', () => {
    const result = routeToURL('custom-path');
    expect(result).toBe('https://game-custom-path.vercel.app/');
  });
});
