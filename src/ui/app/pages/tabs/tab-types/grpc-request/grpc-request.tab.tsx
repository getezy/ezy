import { Container, Spacer } from '@nextui-org/react';
import React from 'react';

import { isGrpcRequestTab } from '@core';
import { useAppStorage } from '@new-storage';

import { SendHeader } from './send-header';

export type GrpcRequestTabProps = {
  tabId: string;
};

export const GrpcRequestTab: React.FC<GrpcRequestTabProps> = ({ tabId }) => {
  const { tabs } = useAppStorage();

  const tab = tabs.find((item) => item.id === tabId);

  if (isGrpcRequestTab(tab)) {
    return (
      <Container gap={0}>
        <Spacer y={0.5} />
        <SendHeader tab={tab} />
      </Container>
    );
  }

  throw new Error('');
};
