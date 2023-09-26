import { SWRConfig, SWRConfiguration } from 'swr';

interface SWRWrapperProps {
  children: React.ReactNode;
}

/**
 * Functional component that render high oirder component swr wrapper and their logic.
 *
 * @return React.ReactElement <SWRWrapper/>
 */
const SWRWrapper = ({ children }: SWRWrapperProps) => {
  const swrOptions: SWRConfiguration = {
    revalidateOnFocus: false,
    revalidateIfStale: false,
    refreshInterval: 5000,
  };

  return <SWRConfig value={swrOptions}>{children}</SWRConfig>;
};

export default SWRWrapper;
