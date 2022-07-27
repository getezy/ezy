import { faArrowRight, faStop, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Loading, Spacer } from '@nextui-org/react';
import React from 'react';

import { GrpcMethodType } from '../../../../../../core/protobuf/interfaces';
import { useBidirectionalStreaming } from '../hooks';
import { SendHeader, SendHeaderProps } from './send-header.basic';

export const BidirectionalStreamingSendHeader: React.FC<
  SendHeaderProps<GrpcMethodType.BIDIRECTIONAL_STREAMING>
> = ({ tab }) => {
  const { invoke, cancel, send, end } = useBidirectionalStreaming();

  const [isClientStreaming, setIsClientStreaming] = React.useState(false);
  const [isServerStreaming, setIsServerStreaming] = React.useState(false);
  const [callId, setCallId] = React.useState<string | null>(null);

  const handleInvokeButtonClick = async () => {
    setIsClientStreaming(true);
    setIsServerStreaming(true);

    const id = await invoke(tab, () => {
      setIsClientStreaming(false);
      setIsServerStreaming(false);
    });

    setCallId(id);
  };

  const handleCancelButtonClick = async () => {
    if (callId) {
      await cancel(tab, callId);
      setCallId(null);
      setIsClientStreaming(false);
      setIsServerStreaming(false);
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
      setIsClientStreaming(false);
    }
  };

  return (
    <SendHeader tab={tab}>
      {(isClientStreaming || isServerStreaming) && (
        <>
          <Spacer x={0.5} />
          <Button
            size="sm"
            color="warning"
            bordered
            borderWeight="light"
            disabled={!isClientStreaming}
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
            disabled={!isClientStreaming}
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
        disabled={isClientStreaming || isServerStreaming}
        css={{ minWidth: 60 }}
        onClick={handleInvokeButtonClick}
      >
        {isClientStreaming || isServerStreaming ? (
          <Loading type="gradient" color="currentColor" size="xs" />
        ) : (
          'Invoke'
        )}
      </Button>
    </SendHeader>
  );
};
