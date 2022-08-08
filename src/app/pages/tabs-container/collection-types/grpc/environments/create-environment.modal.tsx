import { Button, Modal, ModalProps, Text } from '@nextui-org/react';
import { nanoid } from 'nanoid';
import React from 'react';

import { Environment, useEnvironmentsStore } from '../../../../../storage';
import { EnvironmentForm } from './environment.form';

export type CreateEnvironmentModalProps = ModalProps & {
  defaultValues?: Partial<Omit<Environment, 'value'>>;
  onCreate: (environment: Environment) => void;
};

export const CreateEnvironmentModal: React.FC<CreateEnvironmentModalProps> = ({
  onCreate,
  onClose = () => {},
  defaultValues,
  ...props
}) => {
  const createEnvironment = useEnvironmentsStore((store) => store.createEnvironment);

  const handleSubmit = (payload: Environment) => {
    const environment: Environment = { ...payload, id: nanoid() };

    createEnvironment(environment);
    onCreate(environment);
  };

  return (
    <Modal {...props} aria-labelledby="create-environment-modal" onClose={onClose}>
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
          form="create-environment-form"
        >
          Create
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
