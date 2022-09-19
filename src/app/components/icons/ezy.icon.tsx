import { CSS, styled } from '@nextui-org/react';
import React from 'react';

export interface Props {
  className?: string;
  css?: CSS;
}

const StyledSvg = styled('svg', {
  stroke: 'CurrentColor',
});

export const EzyIcon: React.FC<Props> = () => (
  <StyledSvg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      opacity="0.95"
      d="M10 19L8.54456 19C8.15547 19 7.60137 18.4611 7.60137 18.4611L4.14594 12.5389C3.95136 12.2054 3.95137 11.7946 4.14589 11.4611L7.60132 5.53886C7.79589 5.20541 8.15547 5 8.54456 5L12 5M12 19L15.4554 19C15.8445 19 16.2041 18.7946 16.3987 18.4611L19.8541 12.5389C20.0486 12.2054 20.0486 11.7946 19.8541 11.4611L16.3986 5.53886C16.2041 5.20541 15.8445 5 15.4554 5L14 5"
      strokeWidth="2"
    />
  </StyledSvg>
);
