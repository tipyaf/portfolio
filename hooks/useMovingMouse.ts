import { useEffect, useRef, useState } from 'react';

// Linear interpolation function
const lerp = (start: number, end: number, factor: number) => start + (end - start) * factor;

export function useMovingMouse() {
  const [currentX, setCurrentX] = useState(50);
  const [currentY, setCurrentY] = useState(50);
  const [targetX, setTargetX] = useState(50);
  const [targetY, setTargetY] = useState(50);

  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (mainRef.current) {
        const containerRect = mainRef.current.getBoundingClientRect();
        const containerWidth = containerRect.width;
        const containerHeight = containerRect.height;

        const mousePositionInContainerX =
          ((e.clientX - containerRect.left / 2) / containerWidth) * 100;
        const mousePositionInContainerY =
          ((e.clientY - containerRect.top / 2) / containerHeight) * 100;

        setTargetX(mousePositionInContainerX);
        setTargetY(100 - mousePositionInContainerY); // Invert Y for the background
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useEffect(() => {
    let animationFrameId: number;

    const animate = () => {
      setCurrentX((prevX) => lerp(prevX, targetX, 0.05));
      setCurrentY((prevY) => lerp(prevY, targetY, 0.05));

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [targetX, targetY]);

  return { mainRef, currentX, currentY, targetX, targetY, setCurrentX, setCurrentY };
}
