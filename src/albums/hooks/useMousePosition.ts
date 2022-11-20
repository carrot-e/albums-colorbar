import { useEffect, useState } from 'react';

export default () => {
  const [mousePosition, setMousePosition] = useState<{
    clientX: number;
    clientY: number;
  }>();

  const updateMousePosition = (e: MouseEvent) => {
    setMousePosition({ clientX: e.clientX, clientY: e.clientY });
  };

  useEffect(() => {
    window.addEventListener('mousemove', updateMousePosition, true);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition, true);
    };
  }, []);

  return mousePosition;
};
