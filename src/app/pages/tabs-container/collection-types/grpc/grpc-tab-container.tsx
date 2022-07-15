import { Spacer } from '@nextui-org/react';
import React from 'react';

import { GrpcMethodType } from '../../../../../core/protobuf/interfaces';
import { ResizablePanel } from '../../../../components';
import { CollectionType, Tab } from '../../../../storage';
import { Request } from './request';
import { Response } from './response';
import { SendHeader } from './send-header';

export interface GrpcTabContainerProps {
  tab: Tab<CollectionType.GRPC>;
}

export const GrpcTabContainer: React.FC<GrpcTabContainerProps> = ({ tab }) => {
  if (tab.info.methodType === GrpcMethodType.SERVER_STREAMING) {
    return (
      <>
        <SendHeader tab={tab} />
        <Spacer />
        <ResizablePanel firstNode={<Request tab={tab} />} secondNode={<Response tab={tab} />} />
      </>
    );
  }

  return (
    <>
      <SendHeader tab={tab} />
      <Spacer />
      <ResizablePanel firstNode={<Request tab={tab} />} secondNode={<Response tab={tab} />} />
    </>
  );
};
