import { styled } from '@nextui-org/react';
import React from 'react';

// @ts-ignore
const StyledCircle = styled('span', {
  height: 10,
  width: 10,
  borderRadius: '50%',
  display: 'inline-block',
});

export interface CircleProps {
  color: string;
}

export const Circle: React.FC<CircleProps> = ({ color }) => (
  <StyledCircle css={{ backgroundColor: color }} />
);
