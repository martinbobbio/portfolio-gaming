import { useEffect, useMemo, useState } from 'react';
import {
  DialogBoxTextures,
  DialogBoxAnimations,
  DialogBoxState,
} from '../../interfaces';

interface useDoorProps {
  textures: DialogBoxTextures;
}

const useDialogBox = ({ textures }: useDoorProps) => {
  const animations = useMemo(() => {
    const fadeIn = {
      autoplay: true,
      loop: false,
      frameBuffer: 50,
      frameRate: 3,
    };
    const fadeOut = {
      autoplay: true,
      loop: false,
      frameBuffer: 500,
      frameRate: 2,
    };
    const animations: DialogBoxAnimations = {
      helloIn: {
        ...fadeIn,
        texture: textures.helloIn,
      },
      helloOut: {
        ...fadeOut,
        texture: textures.helloOut,
      },
      deadIn: {
        ...fadeIn,
        texture: textures.deadIn,
      },
      deadOut: {
        ...fadeOut,
        texture: textures.deadOut,
      },
      exclamationIn: {
        ...fadeIn,
        texture: textures.exclamationIn,
      },
      exclamationOut: {
        ...fadeOut,
        texture: textures.exclamationOut,
      },
    };
    return animations;
  }, [textures]);

  const [dialogBox] = useState<DialogBoxState>(() => {
    const dialogBox = {
      animations,
      currentAnimation: animations.helloIn,
      visible: false,
      setAnimation: (key: keyof DialogBoxAnimations) => {
        dialogBox.visible = true;
        dialogBox.currentAnimation = animations[key];
      },
      deleteAnimation: () => (dialogBox.visible = false),
    };

    return dialogBox;
  });

  useEffect(() => {
    const fadeIn = (value: keyof DialogBoxAnimations) => {
      dialogBox.setAnimation(value);
    };
    const fadeOut = (value: keyof DialogBoxAnimations) => {
      dialogBox.deleteAnimation();
      setTimeout(() => {
        dialogBox.setAnimation(value);
      }, 1000);
    };

    animations.helloIn.onComplete = () => fadeIn('helloOut');
    animations.helloOut.onComplete = () => fadeOut('helloIn');
    animations.deadIn.onComplete = () => fadeIn('deadOut');
    animations.deadOut.onComplete = () => fadeOut('deadIn');
    animations.exclamationIn.onComplete = () => fadeIn('exclamationOut');
    animations.exclamationOut.onComplete = () => fadeOut('exclamationIn');
  }, [animations, dialogBox]);

  return {
    dialogBox,
  };
};

export default useDialogBox;
