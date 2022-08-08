import { Button, Modal, ModalProps, Text } from '@nextui-org/react';
import React from 'react';

import {
  GrpcTlsConfig,
  GrpcTlsType,
} from '../../../../../../core/clients/grpc-client/interfaces/grpc-client.interface';
import { TlsForm } from './tls.form';

export type TlsSettingsModalProps = ModalProps & {
  defaultValues?: Partial<GrpcTlsConfig<GrpcTlsType>>;
  onCreate: (tls: GrpcTlsConfig<GrpcTlsType>) => void;
};

export const TlsSettingsModal: React.FC<TlsSettingsModalProps> = ({
  onCreate,
  onClose = () => {},
  defaultValues,
  ...props
}) => {
  const handleSubmit = (payload: GrpcTlsConfig<GrpcTlsType>) => {
    onCreate(payload);
  };

  return (
    <Modal {...props} aria-labelledby="tls-settings-modal" onClose={onClose}>
      <Modal.Header css={{ userSelect: 'none' }}>
        <Text>TLS Settings</Text>
      </Modal.Header>
      <Modal.Body>
        <TlsForm id="tls-form" defaultValues={defaultValues} onSubmit={handleSubmit} />
      </Modal.Body>
      <Modal.Footer>
        <Button auto bordered borderWeight="light" size="sm" color="error" onClick={onClose}>
          Cancel
        </Button>
        <Button
          auto
          bordered
          borderWeight="light"
          size="sm"
          color="gradient"
          type="submit"
          form="tls-form"
        >
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
