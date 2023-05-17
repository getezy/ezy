import React from 'react';

export function useOnScreen(ref: React.RefObject<HTMLDivElement>, rootMargin = '0px') {
  // State and setter for storing whether element is visible
  const [isIntersecting, setIntersecting] = React.useState(false);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Update our state when observer callback fires
        setIntersecting(entry.isIntersecting);
      },
      {
        rootMargin,
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []); // Empty array ensures that effect is only run on mount and unmount

  return isIntersecting;
}
