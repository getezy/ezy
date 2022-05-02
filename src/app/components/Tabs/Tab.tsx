import { styled } from '@nextui-org/react';
import React from 'react';
import { Tab as ReactTab } from 'react-tabs';

// @ts-ignore
const StyledTab = styled(ReactTab, {
  display: 'flex',
  flexWrap: 'nowrap',
  marginBottom: 0,
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
const Tab = (props) => <StyledTab {...props} />;

// @ts-ignore
Tab.tabsRole = 'Tab';

export { Tab };
