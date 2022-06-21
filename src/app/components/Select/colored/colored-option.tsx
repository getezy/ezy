import { styled, VariantProps } from '@nextui-org/react';
import React from 'react';
import { components, OptionProps } from 'react-select';

import { ColorCircle } from '../../color-circle';
import { ColoredSelectOption } from './interfaces';

const StyledDiv = styled('div', {
  display: 'flex',
  flexWrap: 'nowrap',
  alignItems: 'center',
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

export type ColoredOptionProps = OptionProps<ColoredSelectOption> & VariantProps<typeof StyledDiv>;

export const ColoredOption: React.FC<ColoredOptionProps> = ({ data, size = 'sm', ...props }) => (
  <StyledDiv size={size}>
    <components.Option {...props} data={data}>
      <ColorCircle color={data.color} />
      <span style={{ paddingLeft: 5 }}>{data.label}</span>
    </components.Option>
  </StyledDiv>
);
