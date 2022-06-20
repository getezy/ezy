import { styled, Text, VariantProps } from '@nextui-org/react';
import React from 'react';

const StyledBadge = styled('div', {
  fontSize: '$$badgeFontSize',
  width: 'fit-content',
  userSelect: 'none',

  variants: {
    color: {
      primary: {
        backgroundColor: '$primary',
      },
      secondary: {
        backgroundColor: '$secondary',
      },
      success: {
        backgroundColor: '$success',
      },
      warning: {
        backgroundColor: '$warning',
      },
      error: {
        backgroundColor: '$error',
      },
    },
    size: {
      xs: {
        $$badgeFontSize: '$fontSizes$xs',
        padding: 1,
      },
      sm: {
        $$badgeFontSize: '$fontSizes$xs',
        padding: 2,
      },
      md: {
        $$badgeFontSize: '$fontSizes$xs',
        padding: 3,
      },
      lg: {
        $$badgeFontSize: '$fontSizes$base',
        padding: 4,
      },
      xl: {
        $$badgeFontSize: '$fontSizes$sm',
        padding: 5,
      },
    },
  },
});

export type BadgeProps = {
  text: string;
} & VariantProps<typeof StyledBadge>;

export const Badge: React.FC<BadgeProps> = ({ color, text, size = 'sm' }) => (
  <StyledBadge color={color} size={size}>
    <Text css={{ fontSize: 'inherit' }}>{text}</Text>
  </StyledBadge>
);
