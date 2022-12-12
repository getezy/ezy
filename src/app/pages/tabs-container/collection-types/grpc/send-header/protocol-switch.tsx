import { faGlobe, faWarning } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Container, Spacer, Switch, SwitchEvent, Text, Tooltip, useTheme } from '@nextui-org/react';
import React from 'react';

import { GrpcMethodType } from '@core/types';
import { GrpcProtocol, GrpcTab } from '@storage';

export interface ProtocolSwitchProps {
  tab: GrpcTab<GrpcMethodType>;

  onChange: (event: SwitchEvent) => void;
}

export const ProtocolSwitch: React.FC<ProtocolSwitchProps> = ({ tab, onChange }) => {
  const { theme } = useTheme();

  const isGrpcWebAvailable =
    tab.info.methodType === GrpcMethodType.UNARY ||
    tab.info.methodType === GrpcMethodType.SERVER_STREAMING;

  let content = (
    <Text size="$sm">
      {tab.data.protocol === GrpcProtocol.GRPC_WEB ? 'Using gRPC-Web' : 'Using gRPC'}
    </Text>
  );

  if (!isGrpcWebAvailable) {
    content = (
      <Container gap={0}>
        <Text size="$sm">Using gRPC</Text>
        <Spacer y={0.5} />
        <Container gap={0} display="flex" alignItems="center">
          <FontAwesomeIcon icon={faWarning} color={theme?.colors.yellow700.value} />
          <Spacer x={0.5} />
          <Text size="$xs">
            gRPC-Web doesn&apos;t support
            {tab.info.methodType === GrpcMethodType.CLIENT_STREAMING
              ? ' client streaming'
              : ' bidirectional streaming'}
          </Text>
        </Container>
      </Container>
    );
  }

  return (
    <Tooltip content={content} placement="left" enterDelay={500} css={{ width: 'max-content' }}>
      <Switch
        size="md"
        bordered
        borderWeight="light"
        color={isGrpcWebAvailable ? 'primary' : 'error'}
        disabled={!isGrpcWebAvailable}
        icon={<FontAwesomeIcon icon={faGlobe} />}
        checked={tab.data.protocol === GrpcProtocol.GRPC_WEB}
        onChange={onChange}
      />
    </Tooltip>
  );
};
