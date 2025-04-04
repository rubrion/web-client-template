declare module 'framer-motion' {
  import * as React from 'react';

  export interface MotionProps {
    initial?: any;
    animate?: any;
    exit?: any;
    transition?: any;
    variants?: any;
    whileHover?: any;
    whileTap?: any;
    whileInView?: any;
    viewport?: any;
    style?: React.CSSProperties;
    className?: string;
    key?: React.Key;
    [key: string]: any;
  }

  export interface MotionDivProps extends MotionProps {
    children?: React.ReactNode;
  }

  export const motion: {
    div: React.FC<MotionDivProps>;
    path: React.FC<MotionProps>;
    svg: React.FC<MotionProps>;
    // Add other motion components as needed
  };

  export interface AnimatePresenceProps {
    children?: React.ReactNode;
    mode?: 'sync' | 'wait' | 'popLayout';
    initial?: boolean;
    onExitComplete?: () => void;
  }

  export const AnimatePresence: React.FC<AnimatePresenceProps>;
}
