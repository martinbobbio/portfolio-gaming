import { FAIcon } from '@/components';
import { ButtonControl, ControlsStyled } from './Controls.styled';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons/faArrowLeft';
import { faArrowDown, faArrowRight } from '@fortawesome/free-solid-svg-icons';

const Controls = () => {
  return (
    <ControlsStyled>
      <ButtonControl className='left'>
        <FAIcon size='xxl' icon={faArrowLeft} />
      </ButtonControl>
      <ButtonControl className='right'>
        <FAIcon size='xxl' icon={faArrowRight} />
      </ButtonControl>
      <ButtonControl className='down-right'>
        <FAIcon size='xxl' icon={faArrowDown} />
      </ButtonControl>
      <ButtonControl className='down-left'>
        <FAIcon size='xxl' icon={faArrowDown} />
      </ButtonControl>
    </ControlsStyled>
  );
};

export default Controls;
