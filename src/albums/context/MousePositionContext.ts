import { createContext } from 'react';

const MousePositionContext = createContext<
  | {
      clientX: number;
      clientY: number;
    }
  | undefined
>(undefined);

export default MousePositionContext;
