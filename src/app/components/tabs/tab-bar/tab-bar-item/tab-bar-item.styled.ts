import { styled, VariantProps } from '@nextui-org/react';

export const StyledTabBarItem = styled('div', {
  display: 'flex',
  flexWrap: 'nowrap',
  whiteSpace: 'nowrap',
  alignItems: 'baseline',

  width: 'fit-content',

  userSelect: 'none',
  cursor: 'pointer',

  padding: '5px 0px 5px 5px',
  backgroundColor: '$accents0',

  '&:hover': {
    color: '$text',
    backgroundColor: '$accents1',
  },

  variants: {
    active: {
      true: {
        color: '$text',
      },
      false: {
        color: '$accents8',
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
