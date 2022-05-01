import { styled } from '@nextui-org/react';
import { TabList as ReactTablList } from 'react-tabs';

// @ts-ignore
const TabList = styled(ReactTablList, {
  display: 'flex',
  overflow: 'auto',
  // border: 'solid 1px',
});

// @ts-ignore
TabList.tabsRole = 'TabList';

export { TabList };
