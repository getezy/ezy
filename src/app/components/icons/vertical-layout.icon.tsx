import { useTheme } from '@nextui-org/react';
import React from 'react';

export const VerticalLayoutIcon: React.FC<React.SVGProps<SVGElement>> = ({ onClick }) => {
  const { theme } = useTheme();

  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <path
        d="M11.6448 23.7277L11.5948 0.273813L18.9494 0.259645C21.5728 0.254592 23.704 2.37714 23.7096 5.00048L23.7393 18.9544C23.7449 21.5777 21.6228 23.7085 18.9995 23.7135L11.6448 23.7277Z"
        fill={theme?.colors?.background.value}
        stroke={isHovered ? theme?.colors?.warning.value : theme?.colors?.foreground.value}
        strokeWidth="0.5"
      />
      <path
        d="M0.290449 18.9995L0.260677 5.04563C0.25508 2.42228 2.37719 0.291536 5.00053 0.286483L12.3552 0.272315L12.4053 23.7262L5.05058 23.7404C2.42723 23.7454 0.296046 21.6229 0.290449 18.9995Z"
        fill={isHovered ? theme?.colors?.yellow100.value : theme?.colors?.accents4.value}
        stroke={isHovered ? theme?.colors?.warning.value : theme?.colors?.foreground.value}
        strokeWidth="0.5"
      />
    </svg>
  );
};
