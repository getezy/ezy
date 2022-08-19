import { CSS, styled, VariantProps } from '@nextui-org/react';
import React from 'react';

const StyledActiveBar = styled('div', {
  position: 'absolute',
  height: 1,
  pointerEvents: 'none',

  variants: {
    color: {
      primary: {
        background: '$primary',
      },
      secondary: {
        background: '$secondary',
      },
      success: {
        background: '$success',
      },
      warning: {
        background: '$warning',
      },
      error: {
        background: '$error',
      },
    },

    disabled: {
      true: {
        display: 'none',
      },
    },

    position: {
      top: {
        top: 1,
      },
      bottom: {
        bottom: 0,
      },
    },

    animated: {
      true: {
        transition: 'all 0.2s',
      },
    },
  },
});

export type ActiveBarProps = { css?: CSS } & VariantProps<typeof StyledActiveBar>;

export const ActiveBar: React.FC<ActiveBarProps> = ({
  disabled = false,
  position = 'top',
  animated = true,
  color = 'primary',
  css,
}) => (
  <StyledActiveBar
    disabled={disabled}
    position={position}
    animated={animated}
    color={color}
    css={css}
  />
);
