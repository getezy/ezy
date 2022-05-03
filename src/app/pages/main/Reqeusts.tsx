import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Container, Input, styled } from '@nextui-org/react';
import React from 'react';

import { Tabs } from '../../components';
import { useTabsStore } from '../../storage';

// @ts-ignore
const SendButton = styled(Button, {
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
});

export const Requests = (): JSX.Element => {
  const tabs = useTabsStore((store) => store.tabs).map((item) => ({
    ...item,
    content: (
      <Container fluid css={{ display: 'flex', flexWrap: 'nowrap' }}>
        <Input
          size="sm"
          labelLeft="URL"
          animated={false}
          clearable
          placeholder="127.0.0.1:3000"
          css={{ flex: 1 }}
        />
        <SendButton
          size="sm"
          bordered
          color="gradient"
          iconRight={<FontAwesomeIcon icon={faPaperPlane} />}
        >
          Send
        </SendButton>
      </Container>
    ),
  }));
  const activateTab = useTabsStore((store) => store.activate);
  const getActiveTabId = useTabsStore((store) => store.getActiveTabId);

  return <Tabs tabs={tabs} activeKey={getActiveTabId()} onChange={activateTab} />;
};
