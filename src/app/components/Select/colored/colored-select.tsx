import { styled } from '@nextui-org/react';
import React from 'react';

import { Environment } from '../../../storage';
import { SelectFactory, SelectProps } from '../select';
import { StyledSelect } from '../select.styled';
import { ColoredOption } from './colored-option';
import { ColoredSingleValue } from './colored-single-value';

export type ColoredSelectProps = SelectProps<Environment> & {
  onRemove: (item: Environment) => void;
};

const TypedColoredSelect = React.memo(SelectFactory<Environment>());
const StyledColoredSelect = React.memo(styled(TypedColoredSelect, StyledSelect));

export const ColoredSelect: React.FC<ColoredSelectProps> = ({
  bordered = false,
  separator = false,
  size = 'md',
  css,
  ...props
}) => (
  <StyledColoredSelect
    bordered={bordered}
    separator={separator}
    size={size}
    css={css}
    {...props}
    className="react-select"
    classNamePrefix="react-select"
    isSearchable={false}
    components={{
      SingleValue: ColoredSingleValue,
      // @ts-ignore
      Option: ColoredOption,
    }}
  />
);
