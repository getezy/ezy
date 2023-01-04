import { styled, VariantProps } from '@nextui-org/react';
import chroma from 'chroma-js';
import React from 'react';

const StyledCircle = styled('div', {
  minHeight: 'calc($$circleHeightRatio * $3)',
  minWidth: 'calc($$circleWidthRatio * $3)',
  borderRadius: '50%',

  variants: {
    size: {
      xs: {
        $$circleHeightRatio: '1.2',
        $$circleWidthRatio: '1.2',
      },
      sm: {
        $$circleHeightRatio: '1.6',
        $$circleWidthRatio: '1.6',
      },
      md: {
        $$circleHeightRatio: '2',
        $$circleWidthRatio: '2',
      },
      lg: {
        $$circleHeightRatio: '2.2',
        $$circleWidthRatio: '2.2',
      },
      xl: {
        $$circleHeightRatio: '2.6',
        $$circleWidthRatio: '2.6',
      },
    },
  },
});

export type CircleProps = {
  color: string;
  shadow?: boolean;
} & VariantProps<typeof StyledCircle>;

export const ColorCircle: React.FC<CircleProps> = ({ color, size = 'sm', shadow = false }) => (
  <StyledCircle
    css={{
      backgroundColor: color,
      boxShadow: shadow ? `0 0 1em ${chroma(color).brighten(1).hex()}` : undefined,
    }}
    size={size}
  />
);
