import { CSS, NormalWeights, styled, Text, VariantProps } from '@nextui-org/react';
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
        borderTopLeftRadius: '2px',
        borderBottomRightRadius: '2px',
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
        color: '$primaryLightContrast',
        backgroundColor: 'transparent',
      },
    },
    {
      color: 'secondary',
      bordered: true,
      css: {
        borderColor: '$secondary',
        color: '$secondaryLightContrast',
        backgroundColor: 'transparent',
      },
    },
    {
      color: 'success',
      bordered: true,
      css: {
        borderColor: '$success',
        color: '$successLightContrast',
        backgroundColor: 'transparent',
      },
    },
    {
      color: 'warning',
      bordered: true,
      css: {
        borderColor: '$warning',
        color: '$warningLightContrast',
        backgroundColor: 'transparent',
      },
    },
    {
      color: 'error',
      bordered: true,
      css: {
        borderColor: '$error',
        color: '$errorLightContrast',
        backgroundColor: 'transparent',
      },
    },
  ],
});

export type BadgeProps = {
  text: string;
  weight?: NormalWeights;
  css?: CSS;
} & VariantProps<typeof StyledBadge>;

export const Badge: React.FC<BadgeProps> = ({
  color = 'primary',
  text,
  weight = 'bold',
  size = 'sm',
  bordered = false,
  css,
}) => (
  <StyledBadge color={color} size={size} bordered={bordered} css={css}>
    <Text css={{ fontSize: 'inherit', color: 'inherit' }} weight={weight}>
      {text}
    </Text>
  </StyledBadge>
);
