import { styled } from '@nextui-org/react';
import React from 'react';
import { useDebounce } from 'react-use';

import { GrpcMethodType } from '../../../../../../core/protobuf/interfaces';
import { CodeEditor, Tab, Tabs } from '../../../../../components';
import { GrpcTab, useTabsStore } from '../../../../../storage';

const StyledContainer = styled('div', {
  display: 'flex',
  flex: 1,

  overflow: 'hidden',

  backgroundColor: '$backgroundContrast',
});

export interface RequestProps {
  tab: GrpcTab<GrpcMethodType>;
}

export const Request: React.FC<RequestProps> = ({ tab }) => {
  const { updateGrpcTabData } = useTabsStore((store) => store);

  const [request, setRequest] = React.useState(tab.data.requestTabs.request.value);
  const [metadata, setMetadata] = React.useState(tab.data.requestTabs.metadata.value);

  // TODO: with fast changes and clicking invoke button request payload stays old
  // Related to https://github.com/getezy/ezy/issues/13
  useDebounce(
    () => {
      updateGrpcTabData(tab.id, {
        requestTabs: {
          ...tab.data.requestTabs,
          request: {
            ...tab.data.requestTabs.request,
            value: request,
          },
        },
      });
    },
    1000,
    [request]
  );

  useDebounce(
    () => {
      updateGrpcTabData(tab.id, {
        requestTabs: {
          ...tab.data.requestTabs,
          metadata: {
            ...tab.data.requestTabs.metadata,
            value: metadata,
          },
        },
      });
    },
    1000,
    [metadata]
  );

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
    setRequest(requestValue);
  };

  const handleMetadataChange = (metadataValue: string) => {
    setMetadata(metadataValue);
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
            value={request}
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
            value={metadata}
            onChange={handleMetadataChange}
          />
        </Tab>
      </Tabs>
    </StyledContainer>
  );
};
