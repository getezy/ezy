import { Button, Modal, ModalProps, Text } from '@nextui-org/react';
import React from 'react';

import { Service, useServicesStore } from '../../../storage';
import { ServiceForm } from '../forms/service.form';

export const CreateServiceModal: React.FC<ModalProps> = ({ onClose = () => {}, ...props }) => {
  const createService = useServicesStore((store) => store.create);

  const handleSubmit = (payload: Service) => {
    createService(payload);
    onClose();
  };

  return (
    <Modal {...props} onClose={onClose} css={{ backgroundColor: '$backgroundContrast' }}>
      <Modal.Header css={{ userSelect: 'none' }}>
        <Text>New Service</Text>
      </Modal.Header>
      <Modal.Body>
        <ServiceForm id="create-service-form" onSubmit={handleSubmit} />
      </Modal.Body>
      <Modal.Footer>
        <Button auto bordered size="sm" color="error" onClick={onClose}>
          Cancel
        </Button>
        <Button auto bordered size="sm" color="gradient" type="submit" form="create-service-form">
          Create
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
