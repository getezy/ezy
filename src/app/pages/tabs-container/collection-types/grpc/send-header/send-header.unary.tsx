import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Loading, Spacer } from '@nextui-org/react';
import React from 'react';

import { GrpcMethodType } from '../../../../../../core/protobuf/interfaces';
import { useUnaryCall } from '../hooks';
import { SendButton } from './send-button.styled';
import { SendHeader, SendHeaderProps } from './send-header.basic';

export const UnarySendHeader: React.FC<SendHeaderProps<GrpcMethodType.UNARY>> = ({ tab }) => {
  const { invoke } = useUnaryCall();

  const [isLoading, setIsLoading] = React.useState(false);

  const handleSendButtonClick = async () => {
    setIsLoading(true);

    await invoke(tab);

    setIsLoading(false);
  };

  return (
    <SendHeader tab={tab}>
      <Spacer x={0.5} />
      <SendButton
        size="sm"
        bordered
        borderWeight="light"
        color="gradient"
        iconRight={<FontAwesomeIcon icon={faPaperPlane} />}
        onClick={handleSendButtonClick}
      >
        {isLoading ? <Loading type="gradient" color="currentColor" size="xs" /> : 'Send'}
      </SendButton>
    </SendHeader>
  );
};
