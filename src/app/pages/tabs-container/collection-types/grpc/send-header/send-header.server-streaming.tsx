import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Loading, Spacer } from '@nextui-org/react';
import React from 'react';

import { GrpcMethodType } from '../../../../../../core/protobuf/interfaces';
import { useServerStreaming } from '../hooks';
import { SendHeader, SendHeaderProps } from './send-header.basic';

export const ServerStreamingSendHeader: React.FC<
  SendHeaderProps<GrpcMethodType.SERVER_STREAMING>
> = ({ tab }) => {
  const { invoke, cancel } = useServerStreaming();

  const [isLoading, setIsLoading] = React.useState(false);
  const [callId, setCallId] = React.useState<string | null>(null);

  const handleInvokeButtonClick = async () => {
    setIsLoading(true);

    const id = await invoke(tab, () => {
      setIsLoading(false);
    });

    setCallId(id);
  };

  const handleCancelButtonClick = async () => {
    if (callId) {
      await cancel(tab, callId);
      setCallId(null);
      setIsLoading(false);
    }
  };

  return (
    <SendHeader tab={tab}>
      {isLoading && (
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
        disabled={isLoading}
        css={{ minWidth: 60 }}
        onClick={handleInvokeButtonClick}
      >
        {isLoading ? <Loading type="gradient" color="currentColor" size="xs" /> : 'Invoke'}
      </Button>
    </SendHeader>
  );
};
