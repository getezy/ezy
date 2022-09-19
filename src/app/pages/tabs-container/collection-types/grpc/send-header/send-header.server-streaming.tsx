import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Loading, Spacer } from '@nextui-org/react';
import React from 'react';
import { useUnmount } from 'react-use';

import { GrpcMethodType } from '../../../../../../core/protobuf/interfaces';
import { useServerStreaming } from '../hooks';
import { SendHeader, SendHeaderProps } from './send-header.basic';

export const ServerStreamingSendHeader: React.FC<
  SendHeaderProps<GrpcMethodType.SERVER_STREAMING>
> = ({ tab }) => {
  const { invoke, cancel } = useServerStreaming();

  const [isStreaming, setIsStreaming] = React.useState(false);
  const [callId, setCallId] = React.useState<string | null>(null);

  const handleInvokeButtonClick = async () => {
    const id = await invoke(tab, () => {
      setIsStreaming(false);
    });

    if (id) {
      setIsStreaming(true);
      setCallId(id);
    }
  };

  const handleCancelButtonClick = async () => {
    if (callId) {
      await cancel(tab, callId);
      setCallId(null);
      setIsStreaming(false);
    }
  };

  useUnmount(() => {
    handleCancelButtonClick();
  });

  return (
    <SendHeader tab={tab}>
      {isStreaming && (
        <>
          <Spacer x={0.5} />
          <Button
            size="sm"
            color="error"
            bordered
            borderWeight="light"
            css={{ minWidth: 10 }}
            icon={<FontAwesomeIcon icon={faXmark} />}
            onClick={handleCancelButtonClick}
          />
        </>
      )}
      <Spacer x={0.5} />
      <Button
        size="sm"
        bordered
        borderWeight="light"
        color="gradient"
        disabled={isStreaming}
        css={{
          minWidth: 60,
          '.nextui-drip .nextui-drip-filler': {
            fill: '$ezy',
          },
        }}
        onClick={handleInvokeButtonClick}
      >
        {isStreaming ? <Loading type="gradient" color="currentColor" size="xs" /> : 'Invoke'}
      </Button>
    </SendHeader>
  );
};
