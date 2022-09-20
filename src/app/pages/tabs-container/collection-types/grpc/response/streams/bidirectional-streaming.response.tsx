import React from 'react';

import { Tab, Tabs, Tree } from '@components';
import { GrpcStreamMessage, GrpcTab } from '@storage';

import { GrpcMethodType } from '../../../../../../../core/protobuf/interfaces';
import { ReponseNode } from './response.node';
import { ListWrapper, StyledContainer } from './response.styled';

export interface BidirectionalStreamingResponseProps {
  tab: GrpcTab<GrpcMethodType.BIDIRECTIONAL_STREAMING>;
}

export const BidirectionalStreamingResponse: React.FC<BidirectionalStreamingResponseProps> = ({
  tab,
}) => (
  <StyledContainer>
    <Tabs activeKey={tab.data.response.id} activeBar={{ color: 'secondary', position: 'bottom' }}>
      <Tab title="Response" id={tab.data.response.id} key={tab.data.response.id}>
        <ListWrapper>
          <Tree<GrpcStreamMessage> data={tab.data.response.messages} defaultIsOpen={false}>
            {tab.data.response.messages?.map((message) => (
              <ReponseNode id={message.id} key={message.id} data={message} />
            ))}
          </Tree>
        </ListWrapper>
      </Tab>
    </Tabs>
  </StyledContainer>
);
