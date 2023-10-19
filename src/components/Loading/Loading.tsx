import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FAIcon } from '..';
import { LoadingStyled } from './Loading.styled';

/**
 * Functional component that render component loading.
 *
 * @return React.ReactElement <Loading/>
 */
const Loading = () => {
  return (
    <LoadingStyled>
      <FAIcon icon={faSpinner} animation='spin' size='xxl' />
    </LoadingStyled>
  );
};

export default Loading;
