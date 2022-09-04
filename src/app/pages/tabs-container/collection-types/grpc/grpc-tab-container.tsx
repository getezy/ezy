import { Container, Spacer } from '@nextui-org/react';
import React from 'react';

import { GrpcMethodType } from '../../../../../core/protobuf/interfaces';
import { ResizablePanel } from '../../../../components';
import {
  GrpcTab,
  isGrpcTabBidirectionalStreaming,
  isGrpcTabClientStreaming,
  isGrpcTabServerStreaming,
  isGrpcTabUnaryCall,
  useSettingsStore,
} from '../../../../storage';
import { Request } from './request';
import {
  BidirectionalStreamingResponse,
  ClientStreamingResponse,
  ServerStreamingResponse,
  UnaryCallResponse,
} from './response';
import {
  BidirectionalStreamingSendHeader,
  ClientStreamingSendHeader,
  ServerStreamingSendHeader,
  UnaryCallSendHeader,
} from './send-header';

export interface GrpcTabContainerProps {
  tab: GrpcTab<GrpcMethodType>;
}

export const GrpcTabContainer: React.FC<GrpcTabContainerProps> = ({ tab }) => {
  const alignment = useSettingsStore((store) => store.alignment);

  let content;

  if (isGrpcTabUnaryCall(tab)) {
    content = (
      <>
        <Spacer />
        <UnaryCallSendHeader tab={tab} />
        <Spacer />
        <ResizablePanel
          alignment={alignment}
          firstNode={<Request tab={tab} />}
          secondNode={<UnaryCallResponse tab={tab} />}
        />
      </>
    );
  }

  if (isGrpcTabServerStreaming(tab)) {
    content = (
      <>
        <Spacer />
        <ServerStreamingSendHeader tab={tab} />
        <Spacer />
        <ResizablePanel
          alignment={alignment}
          firstNode={<Request tab={tab} />}
          secondNode={<ServerStreamingResponse tab={tab} />}
        />
      </>
    );
  }

  if (isGrpcTabClientStreaming(tab)) {
    content = (
      <>
        <Spacer />
        <ClientStreamingSendHeader tab={tab} />
        <Spacer />
        <ResizablePanel
          alignment={alignment}
          firstNode={<Request tab={tab} />}
          secondNode={<ClientStreamingResponse tab={tab} />}
        />
      </>
    );
  }

  if (isGrpcTabBidirectionalStreaming(tab)) {
    content = (
      <>
        <Spacer />
        <BidirectionalStreamingSendHeader tab={tab} />
        <Spacer />
        <ResizablePanel
          alignment={alignment}
          firstNode={<Request tab={tab} />}
          secondNode={<BidirectionalStreamingResponse tab={tab} />}
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
