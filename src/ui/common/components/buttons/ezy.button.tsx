import { Button, ButtonProps } from '@nextui-org/react';
import React from 'react';

export const EzyButton: React.FC<ButtonProps> = ({ css, children, ...props }) => (
  <Button
    {...props}
    css={{
      color: '$accents5',
      '&:hover': {
        color: '$ezy',
      },
      '.nextui-drip .nextui-drip-filler': {
        fill: '$accents1',
      },
      ...css,
    }}
  >
    {children}
  </Button>
);
