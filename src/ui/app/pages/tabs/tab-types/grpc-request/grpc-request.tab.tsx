import { Container } from '@nextui-org/react';
import React from 'react';

import { useTabsStore } from '@new-storage';

export type GrpcRequestTabProps = {
  tabId: string;
};

export const GrpcRequestTab: React.FC<GrpcRequestTabProps> = ({ tabId }) => {
  const { tabs } = useTabsStore();

  const tab = tabs.find((item) => item.id === tabId);

  return <Container>{tab?.title}</Container>;
};
