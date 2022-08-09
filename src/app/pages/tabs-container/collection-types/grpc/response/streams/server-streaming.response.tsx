import { styled } from '@nextui-org/react';
import React from 'react';

import { GrpcMethodType } from '../../../../../../../core/protobuf/interfaces';
import { Tab, Tabs, Tree } from '../../../../../../components';
import { GrpcStreamMessage, GrpcTab } from '../../../../../../storage';
import { ReponseNode } from './response.node';

export interface ServerStreamingResponseProps {
  tab: GrpcTab<GrpcMethodType.SERVER_STREAMING>;
}

const StyledContainer = styled('div', {
  display: 'flex',
  flex: 1,

  overflow: 'hidden',
});

export const ServerStreamingResponse: React.FC<ServerStreamingResponseProps> = ({ tab }) => (
  <StyledContainer>
    <Tabs activeKey={tab.data.response.id} activeBar={{ color: 'secondary', position: 'bottom' }}>
      <Tab title="Response" id={tab.data.response.id} key={tab.data.response.id}>
        <Tree<GrpcStreamMessage> data={tab.data.response.messages} defaultIsOpen={false}>
          {tab.data.response.messages?.map((message) => (
            <ReponseNode id={message.id} key={message.id} data={message} />
          ))}
        </Tree>
      </Tab>
    </Tabs>
  </StyledContainer>
);
