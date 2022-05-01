import { faSquarePlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from '@nextui-org/react';
import React from 'react';
import { TabPanel, Tabs } from 'react-tabs';

import { Explorer, List, Tab, TabList } from '../../components';

export const Main = (): JSX.Element => {
  const header = (
    <Button auto light size="sm" color="warning" icon={<FontAwesomeIcon icon={faSquarePlus} />}>
      Create service
    </Button>
  );

  const menu = <List items={[{ label: 'test' }, { label: 'test2' }]} />;

  return (
    <Explorer header={header} menu={menu}>
      <Tabs>
        <TabList>
          <Tab>Title 1</Tab>
          <Tab>Title 2</Tab>
        </TabList>

        <TabPanel>
          <h2>Any content 1</h2>
        </TabPanel>
        <TabPanel>
          <h2>Any content 2</h2>
        </TabPanel>
      </Tabs>
    </Explorer>
  );
};
