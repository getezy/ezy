import { faCircleXmark, faPaperPlane, faSquarePlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Input } from '@nextui-org/react';
import React from 'react';

import { Explorer, List, Tab, TabList, TabPanel, Tabs } from '../../components';
import { useTabsStore } from '../../storage';

export const Main = (): JSX.Element => {
  const tabs = useTabsStore((store) => store.tabs);

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
          {tabs.map((tab) => (
            <Tab key={tab.name}>
              {tab.name}
              <Button
                auto
                light
                size="xs"
                animated={false}
                iconRight={<FontAwesomeIcon icon={faCircleXmark} />}
              />
            </Tab>
          ))}
        </TabList>

        <TabPanel>
          <Input size="sm" labelLeft="URL" clearable placeholder="127.0.0.1:3000" />
          <Button
            size="sm"
            bordered
            color="gradient"
            iconRight={<FontAwesomeIcon icon={faPaperPlane} />}
          >
            Send
          </Button>
        </TabPanel>
        <TabPanel>
          <h2>Any content 2</h2>
        </TabPanel>
      </Tabs>
    </Explorer>
  );
};
