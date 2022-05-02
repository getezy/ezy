import { styled } from '@nextui-org/react';
import { TabList as ReactTabList } from 'react-tabs';

// @ts-ignore
const TabList = styled(ReactTabList, {
  display: 'flex',
  overflow: 'auto',
  borderBottom: 'solid $accents2 1px',
  paddingTop: 10,

  '&::-webkit-scrollbar': {
    display: 'none',
  },
});

// @ts-ignore
TabList.tabsRole = 'TabList';

export { TabList };
