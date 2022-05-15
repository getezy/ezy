import { styled } from '@nextui-org/react';
import React from 'react';

import { SelectFactory, SelectProps } from '../select';
import { StyledSelect } from '../select.styled';
import { ColoredSingleValue } from './colored-single-value';
import { ColoredSelectOption } from './interfaces';

export type ColoredSelectProps = SelectProps<ColoredSelectOption>;

export const ColoredSelect: React.FC<ColoredSelectProps> = ({
  bordered = false,
  separator = false,
  size = 'md',
  css,
  ...props
}) => {
  const TypedColoredSelect = SelectFactory<ColoredSelectOption>();
  const StyledColoredSelect = styled(TypedColoredSelect, StyledSelect, {
    '.react-select__input-container': {
      paddingLeft: 10,
    },
    '.react-select__placeholder': {
      paddingLeft: 10,
    },
  });

  return (
    <StyledColoredSelect
      bordered={bordered}
      separator={separator}
      size={size}
      css={css}
      className="react-select"
      classNamePrefix="react-select"
      {...props}
      components={{
        // eslint-disable-next-line react/no-unstable-nested-components
        SingleValue: (singleValueProps) => <ColoredSingleValue {...singleValueProps} size={size} />,
      }}
    />
  );
};
