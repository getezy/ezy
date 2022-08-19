import { styled, VariantProps } from '@nextui-org/react';

export const StyledTabBarItem = styled('div', {
  display: 'flex',
  flexWrap: 'nowrap',
  whiteSpace: 'nowrap',
  alignItems: 'baseline',
  fontFamily: '$sans',

  width: 'fit-content',

  userSelect: 'none',
  cursor: 'pointer',

  padding: '5px 0px 5px 5px',

  '&:hover': {
    backgroundColor: '$backgroundContrast',
  },

  [`&:hover p`]: {
    color: '$text',
  },

  variants: {
    active: {
      true: {
        '& p': {
          color: '$text',
        },
      },
      false: {
        '& p': {
          color: '$accents8',
        },
      },
    },

    closable: {
      false: {
        paddingRight: 5,
      },
    },
  },
});

export type TabBarItemProps = {
  id: string;

  onClick?: () => void;
} & VariantProps<typeof StyledTabBarItem>;
