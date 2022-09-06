import { Badge, styled } from '@nextui-org/react';
import React from 'react';

import { GrpcMethodType } from '../../../../../../core/protobuf/interfaces';
import { CodeEditor, Tab, Tabs } from '../../../../../components';
import { GrpcTab } from '../../../../../storage';

const StyledContainer = styled('div', {
  display: 'flex',
  flex: 1,

  overflow: 'hidden',
});

export interface UnaryCallResponseProps {
  tab: GrpcTab<GrpcMethodType.UNARY>;
}

export const UnaryCallResponse: React.FC<UnaryCallResponseProps> = ({ tab }) => {
  const reponseTimings = tab.data.response.timestamp && (
    <Badge size="md" variant="flat" isSquared css={{ marginLeft: 5, marginRight: 5 }}>
      {tab.data.response.timestamp} ms
    </Badge>
  );

  return (
    <StyledContainer>
      <Tabs
        activeKey={tab.data.response.id}
        activeBar={{ color: 'secondary', position: 'bottom' }}
        rightNode={reponseTimings}
      >
        <Tab title="Response" id={tab.data.response.id} key={tab.data.response.id}>
          <CodeEditor
            height="100%"
            maxWidth="100%"
            width="100%"
            value={tab.data.response.value}
            readOnly
          />
        </Tab>
      </Tabs>
    </StyledContainer>
  );
};
