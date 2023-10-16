import { ButtonControl, ControlsStyled } from './Controls.styled';
import { ControlsKingsAndPigs } from '../../interfaces';
import { useKeyPress, useWindowSize } from '@/hooks';
import { FAIcon } from '@/components';
import {
  faArrowLeft,
  faArrowRight,
  faArrowUp,
  faWandMagic,
} from '@fortawesome/free-solid-svg-icons';

interface ControlProps {
  controls: ControlsKingsAndPigs;
}

const Controls = ({ controls }: ControlProps) => {
  const {
    onTouchLeftStart,
    onTouchLeftEnd,
    onTouchRightStart,
    onTouchRightEnd,
    onTouchUp,
    onTouchSpecial,
  } = controls;
  const { isMobile } = useWindowSize();
  useKeyPress('arrowleft', onTouchLeftStart, onTouchLeftEnd);
  useKeyPress('a', onTouchLeftStart, onTouchLeftEnd);
  useKeyPress('arrowright', onTouchRightStart, onTouchRightEnd);
  useKeyPress('d', onTouchRightStart, onTouchRightEnd);
  useKeyPress('arrowup', onTouchUp, () => true);
  useKeyPress('w', onTouchUp, () => true);
  useKeyPress('e', onTouchSpecial, () => true);

  return (
    isMobile && (
      <ControlsStyled>
        <ButtonControl
          onTouchStart={controls.onTouchLeftStart}
          onTouchEnd={controls.onTouchLeftEnd}
          className='left'
        >
          <FAIcon size='xxl' icon={faArrowLeft} />
        </ButtonControl>
        <ButtonControl
          onTouchStart={controls.onTouchRightStart}
          onTouchEnd={controls.onTouchRightEnd}
          className='right'
        >
          <FAIcon size='xxl' icon={faArrowRight} />
        </ButtonControl>
        <ButtonControl onTouchStart={controls.onTouchUp} className='down-right'>
          <FAIcon size='xxl' icon={faArrowUp} />
        </ButtonControl>
        <ButtonControl
          onTouchStart={controls.onTouchSpecial}
          className='down-left'
        >
          <FAIcon size='xxl' icon={faWandMagic} />
        </ButtonControl>
      </ControlsStyled>
    )
  );
};

export default Controls;
