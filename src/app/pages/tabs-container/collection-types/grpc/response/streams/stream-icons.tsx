import {
  faArrowLeft,
  faArrowRight,
  faCheck,
  faPlay,
  faStop,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { styled, Text } from '@nextui-org/react';
import React from 'react';

import { GrpcStreamMessageType } from '@storage';

const IconWrapper = styled('div', {
  minWidth: 12,
  maxWidth: 12,
});

export const StreamIcons = {
  [GrpcStreamMessageType.CLIENT_MESSAGE]: (
    <IconWrapper css={{ color: '$warning' }}>
      <FontAwesomeIcon size="xs" icon={faArrowRight} />
    </IconWrapper>
  ),
  [GrpcStreamMessageType.SERVER_MESSAGE]: (
    <IconWrapper css={{ color: '$secondary' }}>
      <FontAwesomeIcon size="xs" icon={faArrowLeft} />
    </IconWrapper>
  ),
  [GrpcStreamMessageType.STARTED]: (
    <IconWrapper css={{ color: '$primary' }}>
      <FontAwesomeIcon size="xs" icon={faPlay} />
    </IconWrapper>
  ),
  [GrpcStreamMessageType.CLIENT_STREAMING_ENDED]: (
    <IconWrapper css={{ color: '$success' }}>
      <FontAwesomeIcon size="xs" icon={faCheck} />
    </IconWrapper>
  ),
  [GrpcStreamMessageType.SERVER_STREAMING_ENDED]: (
    <IconWrapper css={{ color: '$success' }}>
      <FontAwesomeIcon size="xs" icon={faCheck} />
    </IconWrapper>
  ),
  [GrpcStreamMessageType.CANCELED]: (
    <IconWrapper css={{ color: '$error' }}>
      <FontAwesomeIcon size="sm" icon={faXmark} />
    </IconWrapper>
  ),
  [GrpcStreamMessageType.ERROR]: (
    <IconWrapper css={{ color: '$error' }}>
      <FontAwesomeIcon size="xs" icon={faStop} />
    </IconWrapper>
  ),
};

export const StreamMessageTypeText = {
  [GrpcStreamMessageType.CLIENT_MESSAGE]: <Text size={14}>Client message</Text>,
  [GrpcStreamMessageType.SERVER_MESSAGE]: <Text size={14}>Server message</Text>,
  [GrpcStreamMessageType.STARTED]: <Text size={14}>Stream started</Text>,
  [GrpcStreamMessageType.CLIENT_STREAMING_ENDED]: <Text size={14}>Client streaming ended</Text>,
  [GrpcStreamMessageType.SERVER_STREAMING_ENDED]: <Text size={14}>Server streaming ended</Text>,
  [GrpcStreamMessageType.CANCELED]: <Text size={14}>Stream canceled</Text>,
  [GrpcStreamMessageType.ERROR]: <Text size={14}>Stream error</Text>,
};
