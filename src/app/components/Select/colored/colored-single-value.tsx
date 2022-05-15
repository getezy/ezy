import { styled, VariantProps } from '@nextui-org/react';
import React from 'react';
import { SingleValueProps } from 'react-select';

import { ColorCircle } from '../../color-circle';
import { ColoredSelectOption } from './interfaces';

const StyledSpan = styled('span', {
  position: 'absolute',
  display: 'flex',
  flexWrap: 'nowrap',
  alignItems: 'center',
  userSelect: 'none',
  paddingLeft: 5,
  font: 'inherit',
  gap: 5,
  fontSize: '$$selectFontSize',

  variants: {
    size: {
      xs: {
        $$selectFontSize: '$fontSizes$tiny',
      },
      sm: {
        $$selectFontSize: '$fontSizes$tiny',
      },
      md: {
        $$selectFontSize: '$fontSizes$xs',
      },
      lg: {
        $$selectFontSize: '$fontSizes$base',
      },
      xl: {
        $$selectFontSize: '$fontSizes$sm',
      },
    },
  },
});

export type ColoredSingleValueProps = SingleValueProps<ColoredSelectOption> &
  VariantProps<typeof StyledSpan>;

export const ColoredSingleValue: React.FC<ColoredSingleValueProps> = ({ data, size = 'sm' }) => (
  <StyledSpan size={size}>
    <ColorCircle color={data.color} />
    {data.label}
  </StyledSpan>
);
