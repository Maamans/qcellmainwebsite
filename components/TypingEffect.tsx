// components/TypingEffect.js
import React from "react";
import Typewriter from "typewriter-effect";

interface TypingEffectProps {
  texts: string[];
  autoStart?: boolean;
  loop?: boolean;
  delay?: number;
  deleteSpeed?: number;
}

interface TypingEffectProps extends Omit<React.ComponentProps<typeof Typewriter>['options'], 'strings'> {
  texts: string[];
}

const TypingEffect: React.FC<TypingEffectProps> = ({
  texts,
  autoStart = true,
  loop = true,
  delay = 60,
  deleteSpeed = 80,
  ...rest
}) => {
  return (
    <Typewriter
      options={{
        strings: texts,
        autoStart,
        loop,
        delay,
        deleteSpeed,
        ...rest,
      }}
    />
  );
};

export default TypingEffect;
