import { faArrowRight, faStop, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Loading, Spacer } from '@nextui-org/react';
import React from 'react';
import { useUnmount } from 'react-use';

import { GrpcMethodType } from '@core';
import { useClientStreaming, useGrpcTabContextStore } from '@hooks';

import { SendHeader, SendHeaderProps } from './send-header.basic';

export const ClientStreamingSendHeader: React.FC<
  SendHeaderProps<GrpcMethodType.CLIENT_STREAMING>
> = ({ tab }) => {
  const { invoke, cancel, send, end } = useClientStreaming();
  const { getContext } = useGrpcTabContextStore();

  const context = getContext<GrpcMethodType.CLIENT_STREAMING>(tab.id);

  const handleInvokeButtonClick = async () => {
    await invoke(tab);
  };

  const handleCancelButtonClick = async () => {
    await cancel(tab);
  };

  const handleSendButtonClick = async () => {
    await send(tab);
  };

  const handleEndButtonClick = async () => {
    await end(tab);
  };

  useUnmount(() => {
    handleCancelButtonClick();
  });

  return (
    <SendHeader tab={tab}>
      {!!context?.isClientStreaming && (
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
        disabled={!!context?.isClientStreaming}
        css={{
          minWidth: 60,
          '.nextui-drip .nextui-drip-filler': {
            fill: '$ezy',
          },
        }}
        onClick={handleInvokeButtonClick}
      >
        {context?.isClientStreaming ? (
          <Loading type="gradient" color="currentColor" size="xs" />
        ) : (
          'Invoke'
        )}
      </Button>
    </SendHeader>
  );
};
