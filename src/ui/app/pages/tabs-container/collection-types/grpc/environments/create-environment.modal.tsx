import { Button, Modal, ModalProps, Text } from '@nextui-org/react';
import React from 'react';
import * as uuid from 'uuid';

import { Environment } from '@core';
import { useEnvironmentsStore } from '@new-storage';

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
  const createEnvironment = useEnvironmentsStore((store) => store.create);

  const handleSubmit = (payload: Environment) => {
    const environment: Environment = { ...payload, id: uuid.v4() };

    createEnvironment(environment);
    onCreate(environment);
  };

  return (
    <Modal
      aria-labelledby="create-environment-modal"
      onClose={onClose}
      css={{ background: '$background' }}
      {...props}
    >
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
        <Button auto bordered borderWeight="light" size="xs" color="error" onClick={onClose}>
          Cancel
        </Button>
        <Button
          bordered
          borderWeight="light"
          size="xs"
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
