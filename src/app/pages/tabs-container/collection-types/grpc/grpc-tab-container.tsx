import { Container, Spacer } from '@nextui-org/react';
import React from 'react';

import { GrpcMethodType } from '../../../../../core/protobuf/interfaces';
import { ResizablePanel } from '../../../../components';
import { GrpcTab, isGrpcTabServerStreamingCall, isGrpcTabUnaryCall } from '../../../../storage';
import { Request } from './request';
import { StreamResponse, UnaryResponse } from './response';
import { StreamSendHeader, UnarySendHeader } from './send-header';

export interface GrpcTabContainerProps {
  tab: GrpcTab<GrpcMethodType>;
}

export const GrpcTabContainer: React.FC<GrpcTabContainerProps> = ({ tab }) => {
  let content;

  if (isGrpcTabUnaryCall(tab)) {
    content = (
      <>
        <Spacer />
        <UnarySendHeader tab={tab} />
        <Spacer />
        <ResizablePanel
          firstNode={<Request tab={tab} />}
          secondNode={<UnaryResponse tab={tab} />}
        />
      </>
    );
  }

  if (isGrpcTabServerStreamingCall(tab)) {
    content = (
      <>
        <Spacer />
        <StreamSendHeader tab={tab} />
        <Spacer />
        <ResizablePanel
          firstNode={<Request tab={tab} />}
          secondNode={<StreamResponse tab={tab} />}
        />
      </>
    );
  }

  return (
    <Container
      gap={0}
      fluid
      display="flex"
      css={{ flex: 1, flexDirection: 'column', flexWrap: 'nowrap' }}
    >
      {content}
    </Container>
  );
};
