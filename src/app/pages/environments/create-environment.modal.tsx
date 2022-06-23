import { Button, Modal, ModalProps, Text } from '@nextui-org/react';
import React from 'react';

import { Environment, useEnvironmentsStore } from '../../storage';
import { EnvironmentForm } from './environment.form';

export type CreateEnvironmentModalProps = ModalProps & {
  defaultValues?: Partial<Omit<Environment, 'id'>>;
};

export const CreateEnvironmentModal: React.FC<CreateEnvironmentModalProps> = ({
  onClose = () => {},
  defaultValues,
  ...props
}) => {
  const createEnvironment = useEnvironmentsStore((store) => store.createEnvironment);

  const handleSubmit = (payload: Environment) => {
    createEnvironment(payload);
    onClose();
  };

  return (
    <Modal {...props} onClose={onClose} css={{ backgroundColor: '$backgroundContrast' }}>
      <Modal.Header css={{ userSelect: 'none' }}>
        <Text>New Environment</Text>
      </Modal.Header>
      <Modal.Body>
        <EnvironmentForm
          id="create-environment-form"
          defaultValues={defaultValues}
          onSubmit={handleSubmit}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button auto bordered size="sm" color="error" onClick={onClose}>
          Cancel
        </Button>
        <Button
          auto
          bordered
          size="sm"
          color="gradient"
          type="submit"
          form="create-environment-form"
        >
          Create
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
