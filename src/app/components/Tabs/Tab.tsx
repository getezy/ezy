import { styled } from '@nextui-org/react';
import { Tab as ReactTab } from 'react-tabs';

// @ts-ignore
const Tab = styled(ReactTab, {
  marginRight: 10,
  borderTopLeftRadius: 5,
  borderTopRightRadius: 5,
  border: 'solid $accents3 1px',
});

// @ts-ignore
Tab.tabsRole = 'Tab';

export { Tab };
