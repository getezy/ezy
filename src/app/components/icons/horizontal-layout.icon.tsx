import { useTheme } from '@nextui-org/react';
import React from 'react';

export const HorizontalLayoutIcon: React.FC = () => {
  const { theme } = useTheme();

  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M0.25 11.6184H23.75V19C23.75 21.6234 21.6234 23.75 19 23.75H5C2.37665 23.75 0.25 21.6234 0.25 19V11.6184Z"
        fill={theme?.colors?.accents4.value}
        stroke="black"
        strokeWidth="0.5"
      />
      <path
        d="M5 0.25H19C21.6234 0.25 23.75 2.37665 23.75 5V12.3816H0.25V5C0.25 2.37664 2.37665 0.25 5 0.25Z"
        fill={theme?.colors?.foreground.value}
        stroke="black"
        strokeWidth="0.5"
      />
    </svg>
  );
};
