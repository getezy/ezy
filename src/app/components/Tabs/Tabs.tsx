import { styled } from '@nextui-org/react';
import { Tabs as ReactTabs } from 'react-tabs';

// @ts-ignore
const Tabs = styled(ReactTabs, {
  '& ul': {
    marginLeft: 0,
    marginRight: 0,
  },
});

export { Tabs };
