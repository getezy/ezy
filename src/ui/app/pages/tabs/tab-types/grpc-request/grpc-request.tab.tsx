import { Container, Spacer } from '@nextui-org/react';
import React from 'react';

import { useAppStorage } from '@new-storage';

import { SendHeader } from './send-header';

export type GrpcRequestTabProps = {
  tabId: string;
};

export const GrpcRequestTab: React.FC<GrpcRequestTabProps> = ({ tabId }) => {
  const { tabs } = useAppStorage();

  const tab = tabs.find((item) => item.id === tabId);

  return (
    <Container gap={0}>
      <Spacer y={0.5} />
      <SendHeader tab={tab} />
    </Container>
  );
};
