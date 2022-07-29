import { Spacer, styled, VariantProps } from '@nextui-org/react';
import React from 'react';
import { components, SingleValueProps } from 'react-select';

import { ColorCircle } from '../../color-circle';
import { ColoredSelectOption } from './interfaces';

const StyledSpan = styled('span', {
  display: 'flex',
  flexWrap: 'nowrap',
  alignItems: 'center',
  gap: 5,

  userSelect: 'none',
  font: 'inherit',
  fontSize: '$$selectFontSize',

  variants: {
    size: {
      xs: {
        $$selectFontSize: '$fontSizes$xs',
      },
      sm: {
        $$selectFontSize: '$fontSizes$xs',
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

export type ColoredSingleValueProps = SingleValueProps<ColoredSelectOption> & {
  selectProps: VariantProps<typeof StyledSpan>;
};

export const ColoredSingleValue: React.FC<ColoredSingleValueProps> = ({
  data,
  selectProps,
  ...props
}) => (
  <components.SingleValue {...props} selectProps={selectProps} data={data}>
    <StyledSpan size={selectProps.size}>
      <ColorCircle color={data.color} size={selectProps.size} shadow />
      <Spacer x={0.1} />
      {data.label}
    </StyledSpan>
  </components.SingleValue>
);
