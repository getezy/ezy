import { styled } from '@nextui-org/react';
import React from 'react';

import { CodeEditor, Tab, Tabs } from '../../../components';
import { useTabsStore } from '../../../storage';

const StyledContainer = styled('div', {
  width: '100%',
  backgroundColor: '$backgroundContrast',
});

export interface RequestProps {
  tabId: string;
}

export const Request: React.FC<RequestProps> = ({ tabId }) => {
  const { updateTab, tabs } = useTabsStore((store) => store);
  const tab = tabs.find((item) => item.id === tabId)!;
  const activeTabId = tab.requestContainer.activeTabId || tab.requestContainer.request.id;

  const handleTabActivate = (key: string) => {
    updateTab({
      ...tab,
      requestContainer: {
        ...tab.requestContainer,
        activeTabId: key,
      },
    });
  };

  const handleRequestChange = (requestValue: string) => {
    updateTab({
      ...tab,
      requestContainer: {
        ...tab.requestContainer,
        request: {
          ...tab.requestContainer.request,
          value: requestValue,
        },
      },
    });
  };

  const handleMetadataChange = (metadataValue: string) => {
    updateTab({
      ...tab,
      requestContainer: {
        ...tab.requestContainer,
        metadata: {
          ...tab.requestContainer.metadata,
          value: metadataValue,
        },
      },
    });
  };

  return (
    // for horizontal alignment height: 100%
    <StyledContainer>
      <Tabs
        activeKey={activeTabId}
        activeBar={{ color: 'secondary', position: 'bottom' }}
        onTabActivate={handleTabActivate}
      >
        <Tab
          title="Request"
          id={tab.requestContainer.request.id}
          key={tab.requestContainer.request.id}
        >
          <CodeEditor
            maxWidth="100%"
            height="calc(100vh - 152px)"
            value={tab.requestContainer.request.value}
            onChange={handleRequestChange}
          />
        </Tab>
        <Tab
          title="Metadata"
          id={tab.requestContainer.metadata.id}
          key={tab.requestContainer.metadata.id}
        >
          <CodeEditor
            maxWidth="100%"
            height="calc(100vh - 152px)"
            value={tab.requestContainer.metadata.value}
            onChange={handleMetadataChange}
          />
        </Tab>
      </Tabs>
    </StyledContainer>
  );
};
