import { FAIcon } from '@/components';
import { ButtonControl, ControlsStyled } from './Controls.styled';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons/faArrowLeft';
import { faArrowDown, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { ControlsGame } from '../../interfaces';
import { useKeyPress } from '@/hooks';

interface ControlProps {
  controls: ControlsGame;
}

/**
 * Functional component that render component controls.
 *
 * @param controls for handle the player controls.
 * @return React.ReactElement <Controls/>
 */
const Controls = ({ controls }: ControlProps) => {
  useKeyPress('arrowleft', controls.onTouchLeftStart, controls.onTouchLeftEnd);
  useKeyPress('a', controls.onTouchLeftStart, controls.onTouchLeftEnd);
  useKeyPress(
    'arrowright',
    controls.onTouchRightStart,
    controls.onTouchRightEnd
  );
  useKeyPress('d', controls.onTouchRightStart, controls.onTouchRightEnd);
  useKeyPress('arrowdown', controls.onTouchDownStart, controls.onTouchDownEnd);
  useKeyPress('s', controls.onTouchDownStart, controls.onTouchDownEnd);

  return (
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
      <ButtonControl
        onTouchStart={controls.onTouchDownStart}
        onTouchEnd={controls.onTouchDownEnd}
        className='down-right'
      >
        <FAIcon size='xxl' icon={faArrowDown} />
      </ButtonControl>
      <ButtonControl
        onTouchStart={controls.onTouchDownStart}
        onTouchEnd={controls.onTouchDownEnd}
        className='down-left'
      >
        <FAIcon size='xxl' icon={faArrowDown} />
      </ButtonControl>
    </ControlsStyled>
  );
};

export default Controls;
