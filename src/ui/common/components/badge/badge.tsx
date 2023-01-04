import { CSS, NormalWeights, Spacer, styled, Text, VariantProps } from '@nextui-org/react';
import React from 'react';

const StyledBadge = styled('div', {
  display: 'flex',
  flexWrap: 'nowrap',
  alignItems: 'center',

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
        $$badgeHeight: '18px',
      },
      sm: {
        $$badgeFontSize: '$fontSizes$sm',
        $$badgeHeight: '26px',
      },
      md: {
        $$badgeFontSize: '$fontSizes$md',
        $$badgeHeight: '30px',
      },
      lg: {
        $$badgeFontSize: '$fontSizes$lg',
        $$badgeHeight: '34px',
      },
      xl: {
        $$badgeFontSize: '$fontSizes$xl',
        $$badgeHeight: '38px',
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
  icon?: React.ReactElement;
  css?: CSS;
} & VariantProps<typeof StyledBadge>;

type IconWrapperProps = {
  icon: React.ReactElement;
};

const IconWrapper: React.FC<IconWrapperProps> = ({ icon }) => (
  <>
    <Spacer inline x={0.2} />
    {icon}
  </>
);

export const Badge: React.FC<BadgeProps> = ({
  color = 'primary',
  text,
  weight = 'bold',
  size = 'sm',
  bordered = false,
  icon,
  css,
}) => (
  <StyledBadge color={color} size={size} bordered={bordered} css={css}>
    <Text css={{ fontSize: 'inherit', color: '$text' }} weight={weight}>
      {text}
    </Text>
    {icon && <IconWrapper icon={icon} />}
  </StyledBadge>
);
