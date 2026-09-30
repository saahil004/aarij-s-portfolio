'use client';

import { domAnimation, LazyMotion, MotionConfig } from 'motion/react';
import type { ReactNode } from 'react';

/**
 * Motion (formerly Framer Motion) for components that open and close. `LazyMotion` +
 * `domAnimation` keeps the bundle small; `reducedMotion="user"` drops transform
 * animations for visitors who ask for less motion.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}
