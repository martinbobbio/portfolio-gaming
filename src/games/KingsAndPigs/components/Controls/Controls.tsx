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
  } = controls;
  useKeyPress('ArrowLeft', onTouchLeftStart, onTouchLeftEnd);
  useKeyPress('a', onTouchLeftStart, onTouchLeftEnd);
  useKeyPress('ArrowRight', onTouchRightStart, onTouchRightEnd);
  useKeyPress('d', onTouchRightStart, onTouchRightEnd);

  return <ControlsStyled />;
};

export default Controls;
