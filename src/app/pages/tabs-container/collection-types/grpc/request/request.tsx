import { styled } from '@nextui-org/react';
import React from 'react';

import { GrpcMethodType } from '../../../../../../core/protobuf/interfaces';
import { CodeEditor, Tab, Tabs } from '../../../../../components';
import { GrpcTab, useTabsStore } from '../../../../../storage';

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

  return (
    <StyledContainer>
      <Tabs
        activeKey={activeTabId}
        activeBar={{ color: 'secondary', position: 'bottom' }}
        onTabActivate={handleTabActivate}
      >
        <Tab
          title="Request"
          id={tab.data.requestTabs.request.id}
          key={tab.data.requestTabs.request.id}
        >
          <CodeEditor
            height="100%"
            maxWidth="100%"
            width="100%"
            value={tab.data.requestTabs.request.value}
            onChange={handleRequestChange}
          />
        </Tab>
        <Tab
          title="Metadata"
          id={tab.data.requestTabs.metadata.id}
          key={tab.data.requestTabs.metadata.id}
        >
          <CodeEditor
            height="100%"
            maxWidth="100%"
            width="100%"
            value={tab.data.requestTabs.metadata.value}
            onChange={handleMetadataChange}
          />
        </Tab>
      </Tabs>
    </StyledContainer>
  );
};
