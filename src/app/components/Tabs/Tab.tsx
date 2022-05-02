import { styled } from '@nextui-org/react';
import { Tab as ReactTab } from 'react-tabs';

// @ts-ignore
const Tab = styled(ReactTab, {
  display: 'flex',
  maxHeight: 30,
  marginBottom: 0,
  marginRight: 2,
  paddingLeft: 10,
  borderTopLeftRadius: 5,
  borderTopRightRadius: 5,
  border: 'solid $accents1 2px',
  background: '$accents2',
  userSelect: 'none',
  '&:focus': {
    outline: 'none',
  },
});

// @ts-ignore
Tab.tabsRole = 'Tab';

export { Tab };
