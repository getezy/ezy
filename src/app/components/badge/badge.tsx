import { NormalWeights, styled, Text, VariantProps } from '@nextui-org/react';
import React from 'react';

const StyledBadge = styled('div', {
  fontSize: '$$badgeFontSize',
  width: 'fit-content',
  userSelect: 'none',

  br: '$space$2',
  paddingLeft: 4,
  paddingRight: 4,
  height: '$$badgeHeight',

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
    bordered: {
      true: {
        border: 'solid 1px',
      },
    },
    size: {
      xs: {
        $$badgeFontSize: '9px',
      },
      sm: {
        $$badgeFontSize: '$fontSizes$sm',
        $$badgeHeight: 26,
      },
      md: {
        $$badgeFontSize: '$fontSizes$md',
        $$badgeHeight: 30,
      },
      lg: {
        $$badgeFontSize: '$fontSizes$lg',
        $$badgeHeight: 34,
      },
      xl: {
        $$badgeFontSize: '$fontSizes$xl',
        $$badgeHeight: 38,
      },
    },
  },
  compoundVariants: [
    {
      color: 'primary',
      bordered: true,
      css: {
        borderColor: '$primary',
        backgroundColor: 'transparent',
      },
    },
    {
      color: 'secondary',
      bordered: true,
      css: {
        borderColor: '$secondary',
        backgroundColor: 'transparent',
      },
    },
    {
      color: 'success',
      bordered: true,
      css: {
        borderColor: '$success',
        backgroundColor: 'transparent',
      },
    },
    {
      color: 'warning',
      bordered: true,
      css: {
        borderColor: '$warning',
        backgroundColor: 'transparent',
      },
    },
    {
      color: 'error',
      bordered: true,
      css: {
        borderColor: '$error',
        backgroundColor: 'transparent',
      },
    },
  ],
});

export type BadgeProps = {
  text: string;
  weight?: NormalWeights;
} & VariantProps<typeof StyledBadge>;

export const Badge: React.FC<BadgeProps> = ({
  color,
  text,
  weight = 'bold',
  size = 'sm',
  bordered = false,
}) => (
  <StyledBadge color={color} size={size} bordered={bordered}>
    <Text css={{ fontSize: 'inherit' }} weight={weight}>
      {text}
    </Text>
  </StyledBadge>
);
