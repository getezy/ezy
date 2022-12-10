import { Container, styled, Text } from '@nextui-org/react';
import React from 'react';

import { CodeEditor, Tab, Tabs } from '@components';
import { GrpcMethodType } from '@core/types';
import { GrpcTab, useTabsStore } from '@storage';

const StyledContainer = styled('div', {
  display: 'flex',
  flex: 1,

  overflow: 'hidden',

  backgroundColor: '$background',
});

export interface RequestProps {
  tab: GrpcTab<GrpcMethodType>;
}

export const Request: React.FC<RequestProps> = ({ tab }) => {
  const { updateGrpcTabData } = useTabsStore((store) => store);

  const activeTabId = tab.data.requestTabs.activeTabId || tab.data.requestTabs.request.id;

  const handleTabActivate = (key: string) => {
    updateGrpcTabData(tab.id, {
      requestTabs: {
        ...tab.data.requestTabs,
        activeTabId: key,
      },
    });
  };

  const handleRequestChange = (requestValue: string) => {
    updateGrpcTabData(tab.id, {
      requestTabs: {
        ...tab.data.requestTabs,
        request: {
          ...tab.data.requestTabs.request,
          value: requestValue,
        },
      },
    });
  };

  const handleMetadataChange = (metadataValue: string) => {
    updateGrpcTabData(tab.id, {
      requestTabs: {
        ...tab.data.requestTabs,
        metadata: {
          ...tab.data.requestTabs.metadata,
          value: metadataValue,
        },
      },
    });
  };

  const toolBar = (
    <Container
      gap={0.5}
      display="flex"
      alignItems="center"
      css={{ height: 20, borderTop: 'solid 0.1px $neutralBorder', bottom: 0 }}
    >
      <Text css={{ color: '$accents8', fontSize: 10 }}>JSON</Text>
    </Container>
  );

  const requestTab = (
    <Tab title="Request" id={tab.data.requestTabs.request.id} key={tab.data.requestTabs.request.id}>
      <Container gap={0} display="flex" direction="column">
        <Container gap={0} display="flex" wrap="nowrap" css={{ flex: 1, overflow: 'hidden' }}>
          <CodeEditor
            height="100%"
            maxWidth="100%"
            width="100%"
            value={tab.data.requestTabs.request.value}
            onChange={handleRequestChange}
          />
        </Container>
        {toolBar}
      </Container>
    </Tab>
  );

  const metadataTab = (
    <Tab
      title="Metadata"
      id={tab.data.requestTabs.metadata.id}
      key={tab.data.requestTabs.metadata.id}
    >
      <Container gap={0} display="flex" direction="column">
        <Container gap={0} display="flex" wrap="nowrap" css={{ flex: 1, overflow: 'hidden' }}>
          <CodeEditor
            height="100%"
            maxWidth="100%"
            width="100%"
            value={tab.data.requestTabs.metadata.value}
            onChange={handleMetadataChange}
          />
        </Container>
        {toolBar}
      </Container>
    </Tab>
  );

  return (
    <StyledContainer>
      <Tabs
        activeKey={activeTabId}
        activeBar={{ color: 'secondary', position: 'bottom' }}
        onTabActivate={handleTabActivate}
      >
        {requestTab}
        {metadataTab}
      </Tabs>
    </StyledContainer>
  );
};
