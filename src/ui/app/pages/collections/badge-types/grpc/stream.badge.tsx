import {
  faArrowLeft,
  faArrowRight,
  faArrowRightArrowLeft,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

import { Badge } from '@components';
import { GrpcMethodType } from '@core';

export type StreamBadeProps = {
  type:
    | GrpcMethodType.CLIENT_STREAMING
    | GrpcMethodType.SERVER_STREAMING
    | GrpcMethodType.BIDIRECTIONAL_STREAMING;
};

const StreamBadgeIcons = {
  [GrpcMethodType.CLIENT_STREAMING]: faArrowRight,
  [GrpcMethodType.SERVER_STREAMING]: faArrowLeft,
  [GrpcMethodType.BIDIRECTIONAL_STREAMING]: faArrowRightArrowLeft,
};

export const StreamBadge: React.FC<StreamBadeProps> = ({ type }) => {
  const icon = <FontAwesomeIcon size="1x" icon={StreamBadgeIcons[type]} />;

  return <Badge text="S" color="success" size="xs" bordered icon={icon} />;
};
