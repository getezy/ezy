import { Button, Loading, Spacer } from '@nextui-org/react';
import React from 'react';

import { GrpcMethodType } from '@core/types';

import { useGrpcTabContextStore, useUnaryCall } from '../hooks';
import { SendHeader, SendHeaderProps } from './send-header.basic';

export const UnaryCallSendHeader: React.FC<SendHeaderProps<GrpcMethodType.UNARY>> = ({ tab }) => {
  const { invoke } = useUnaryCall();
  const { getContext } = useGrpcTabContextStore();

  const context = getContext<GrpcMethodType.UNARY>(tab.id);

  const handleInvokeButtonClick = () => invoke(tab);

  return (
    <SendHeader tab={tab}>
      <Spacer x={0.5} />
      <Button
        size="sm"
        bordered
        borderWeight="light"
        color="gradient"
        disabled={!!context?.isLoading}
        css={{
          minWidth: 60,
          '.nextui-drip .nextui-drip-filler': {
            fill: '$ezy',
          },
        }}
        onClick={handleInvokeButtonClick}
      >
        {context?.isLoading ? <Loading type="gradient" color="currentColor" size="xs" /> : 'Invoke'}
      </Button>
    </SendHeader>
  );
};
