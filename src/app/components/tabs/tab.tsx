import { styled, VariantProps } from '@nextui-org/react';
import React, { PropsWithChildren } from 'react';

const StyledTab = styled('div', {
  padding: 2,
  width: 'fit-content',
  border: 'solid $accents2',
  userSelect: 'none',
  cursor: 'pointer',

  variants: {
    active: {
      true: {
        backgroundColor: '$accents3',
      },
      false: {
        backgroundColor: '$accents1',
      },
    },
  },
});

export type TabProps = {
  disabled?: boolean;

  onClick?: () => void;
} & VariantProps<typeof StyledTab>;

export const Tab: React.FC<PropsWithChildren<TabProps>> = ({
  children,
  active = false,
  disabled = false,
  onClick = () => {},
}) => (
  <StyledTab active={active} onClick={disabled ? undefined : onClick}>
    {children}
  </StyledTab>
);
