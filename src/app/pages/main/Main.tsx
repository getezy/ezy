import { faPaperPlane, faSquarePlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Container, Input } from '@nextui-org/react';
import React from 'react';

import { Explorer, List, TabPanel, Tabs } from '../../components';
import { useTabsStore } from '../../storage';

export const Main = (): JSX.Element => {
  const tabs = useTabsStore((store) => store.tabs);
  const activateTab = useTabsStore((store) => store.activate);

  const header = (
    <Button auto bordered color="gradient" size="sm" icon={<FontAwesomeIcon icon={faSquarePlus} />}>
      Create project
    </Button>
  );

  const menu = <List items={[{ label: 'test' }, { label: 'test2' }]} />;

  return (
    <Explorer header={header} menu={menu}>
      <Tabs defaultIndex={tabs.findIndex((item) => item.active)} tabs={tabs} onSelect={activateTab}>
        {tabs.map((tab) => (
          <TabPanel key={tab.id}>
            <Container fluid css={{ display: 'flex', flexWrap: 'nowrap' }}>
              <Input
                size="sm"
                labelLeft="URL"
                clearable
                placeholder="127.0.0.1:3000"
                css={{ flex: 1 }}
              />
              <Button
                css={{
                  transition: 'opacity 0.25s ease 0s, transform 0.25s ease 0s',
                  svg: {
                    size: '10%',
                    marginLeft: '100px',
                    transition: 'transform 0.25s ease 0s, opacity 200ms ease-in-out 50ms',
                    boxShadow: '0 5px 20px -5px rgba(0, 0, 0, 0.1)',
                  },
                  '&:hover': {
                    opacity: 0.8,
                  },
                  '&:active': {
                    transform: 'scale(0.9)',
                    svg: {
                      transform: 'translate(24px, -24px)',
                      opacity: 0,
                    },
                  },
                }}
                size="sm"
                bordered
                color="gradient"
                iconRight={<FontAwesomeIcon icon={faPaperPlane} />}
              >
                Send
              </Button>
            </Container>
          </TabPanel>
        ))}
      </Tabs>
    </Explorer>
  );
};
