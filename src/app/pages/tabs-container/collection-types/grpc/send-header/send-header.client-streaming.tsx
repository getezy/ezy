import { faArrowRight, faStop, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Loading, Spacer } from '@nextui-org/react';
import React from 'react';
import { useUnmount } from 'react-use';

import { GrpcMethodType } from '@core/types';

import { useClientStreaming } from '../hooks';
import { SendHeader, SendHeaderProps } from './send-header.basic';

export const ClientStreamingSendHeader: React.FC<
  SendHeaderProps<GrpcMethodType.CLIENT_STREAMING>
> = ({ tab }) => {
  const { invoke, cancel, send, end } = useClientStreaming();

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

  const handleSendButtonClick = async () => {
    if (callId) {
      await send(tab, callId);
    }
  };

  const handleEndButtonClick = async () => {
    if (callId) {
      await end(tab, callId);
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
            color="warning"
            bordered
            borderWeight="light"
            css={{ minWidth: 10 }}
            icon={<FontAwesomeIcon icon={faArrowRight} />}
            onClick={handleSendButtonClick}
          />
          <Spacer x={0.5} />
          <Button
            size="sm"
            color="success"
            bordered
            borderWeight="light"
            css={{ minWidth: 10 }}
            icon={<FontAwesomeIcon icon={faStop} />}
            onClick={handleEndButtonClick}
          />
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
