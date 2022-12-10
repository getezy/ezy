import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Loading, Spacer } from '@nextui-org/react';
import React from 'react';
import { useUnmount } from 'react-use';

import { GrpcMethodType } from '@core/types';
import { useGrpcTabContextStore, useServerStreaming } from '@hooks';

import { SendHeader, SendHeaderProps } from './send-header.basic';

export const ServerStreamingSendHeader: React.FC<
  SendHeaderProps<GrpcMethodType.SERVER_STREAMING>
> = ({ tab }) => {
  const { invoke, cancel } = useServerStreaming();
  const { getContext } = useGrpcTabContextStore();

  const context = getContext<GrpcMethodType.SERVER_STREAMING>(tab.id);

  const handleInvokeButtonClick = async () => {
    await invoke(tab);
  };

  const handleCancelButtonClick = async () => {
    await cancel(tab);
  };

  useUnmount(() => {
    handleCancelButtonClick();
  });

  return (
    <SendHeader tab={tab}>
      {!!context?.isServerStreaming && (
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
        disabled={!!context?.isServerStreaming}
        css={{
          minWidth: 60,
          '.nextui-drip .nextui-drip-filler': {
            fill: '$ezy',
          },
        }}
        onClick={handleInvokeButtonClick}
      >
        {context?.isServerStreaming ? (
          <Loading type="gradient" color="currentColor" size="xs" />
        ) : (
          'Invoke'
        )}
      </Button>
    </SendHeader>
  );
};
