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

  variants: {
    active: {
      true: {
        backgroundColor: '$accents2',
      },
      false: {
        backgroundColor: '$accents0',
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
