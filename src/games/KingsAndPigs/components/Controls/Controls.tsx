import { ControlsStyled } from './Controls.styled';
import { ControlsKingsAndPigs } from '../../interfaces';
import { useKeyPress } from '@/hooks';

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
  useKeyPress('arrowleft', onTouchLeftStart, onTouchLeftEnd);
  useKeyPress('a', onTouchLeftStart, onTouchLeftEnd);
  useKeyPress('arrowright', onTouchRightStart, onTouchRightEnd);
  useKeyPress('d', onTouchRightStart, onTouchRightEnd);
  useKeyPress('arrowup', onTouchUp, () => true);
  useKeyPress('w', onTouchUp, () => true);
  useKeyPress('e', onTouchSpecial, () => true);

  return <ControlsStyled />;
};

export default Controls;
