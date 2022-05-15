import { CSS, styled, VariantProps } from '@nextui-org/react';
import React from 'react';
import ReactSelect, { Props as ReactSelectProps } from 'react-select';

import { StyledSelect } from './select.styled';

export type SelectProps<T> = {
  css?: CSS;
} & VariantProps<typeof StyledSelect> &
  ReactSelectProps<T>;

export function SelectFactory<T>() {
  return (props: ReactSelectProps<T>) => <ReactSelect {...props} />;
}

export const Select = <T extends any>({
  bordered = false,
  separator = false,
  size = 'md',
  css,
  ...props
}: SelectProps<T>) => {
  const TypedSelect = SelectFactory<T>();
  const StyledTypedSelect = styled(TypedSelect, StyledSelect);

  return (
    <StyledTypedSelect
      bordered={bordered}
      separator={separator}
      size={size}
      css={css}
      className="react-select"
      classNamePrefix="react-select"
      {...props}
    />
  );
};

// export const Select: React.FC<React.PropsWithChildren<SelectProps>> = ({
//   bordered = false,
//   separator = false,
//   size = 'md',
//   css,
//   ...props
// }) => (
//   <StyledSelect
//     bordered={bordered}
//     separator={separator}
//     size={size}
//     css={css}
//     className="react-select"
//     classNamePrefix="react-select"
//     {...props}
//   />
// );
