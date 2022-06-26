import { NormalWeights, styled, Text, VariantProps } from '@nextui-org/react';
import React from 'react';

const StyledBadge = styled('div', {
  fontSize: '$$badgeFontSize',
  width: 'fit-content',
  userSelect: 'none',
  br: '$$badgeBorderRadius',

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
        $$badgeBorderRadius: '$space$3',
        padding: 1,
      },
      sm: {
        $$badgeFontSize: '$fontSizes$xs',
        $$badgeBorderRadius: '$space$4',
        padding: 2,
      },
      md: {
        $$badgeFontSize: '$fontSizes$xs',
        $$badgeBorderRadius: '$space$4',
        padding: 3,
      },
      lg: {
        $$badgeFontSize: '$fontSizes$base',
        $$badgeBorderRadius: '$space$5',
        padding: 4,
      },
      xl: {
        $$badgeFontSize: '$fontSizes$sm',
        $$badgeBorderRadius: '$space$5',
        padding: 5,
      },
    },
  },
});

export type BadgeProps = {
  text: string;
  weight?: NormalWeights;
} & VariantProps<typeof StyledBadge>;

export const Badge: React.FC<BadgeProps> = ({ color, text, weight = 'bold', size = 'sm' }) => (
  <StyledBadge color={color} size={size}>
    <Text css={{ fontSize: 'inherit' }} weight={weight}>
      {text}
    </Text>
  </StyledBadge>
);
