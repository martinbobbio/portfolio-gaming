import { useContext } from 'react';
import { PixiApplicationContext } from '@/contexts';

/**
 * Hook that facility global contexts calls.
 *
 * @return useGlobalContextResponse
 */
const useGlobalContext = () => {
  const app = useContext(PixiApplicationContext);

  if (app === null) throw new Error('Error using PixiApplicationContext');

  return app;
};

export default useGlobalContext;
