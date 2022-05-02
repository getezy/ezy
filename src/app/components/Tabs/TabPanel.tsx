import { styled } from '@nextui-org/react';
import { TabPanel as ReactTabPanel } from 'react-tabs';

const TabPanel = styled(ReactTabPanel);

// @ts-ignore
TabPanel.tabsRole = 'TabPanel';

export { TabPanel };
