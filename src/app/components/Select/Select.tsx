import { CSS, VariantProps } from '@nextui-org/react';
import React from 'react';
import { Props as ReactSelectProps } from 'react-select';

import { StyledSelect } from './StyledSelect';

export type SelectProps = {
  css?: CSS;
} & VariantProps<typeof StyledSelect> &
  ReactSelectProps;

export const Select: React.FC<React.PropsWithChildren<SelectProps>> = ({
  bordered = false,
  separator = false,
  size = 'md',
  css,
  ...props
}) => (
  <StyledSelect
    bordered={bordered}
    separator={separator}
    size={size}
    css={css}
    className="react-select"
    classNamePrefix="react-select"
    {...props}
  />
);
