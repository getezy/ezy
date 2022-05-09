import { Button, Container, Input, Modal, ModalProps, Spacer, Text } from '@nextui-org/react';
import React from 'react';
import { useForm } from 'react-hook-form';

import { ColorPickerInput } from '../../components';
import { Environment, useEnvironmentsStore } from '../../storage';

export const SaveEnvironmentModal: React.FC<ModalProps> = ({ onClose = () => {}, ...props }) => {
  const createEnvironment = useEnvironmentsStore((store) => store.create);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<Environment>({ defaultValues: { color: '#00D7FF' } });

  const onCloseHandler = () => {
    onClose();
    reset();
  };

  const onSubmitHandler = (payload: Environment) => {
    createEnvironment(payload);
    onCloseHandler();
  };

  return (
    <Modal {...props} onClose={onCloseHandler} css={{ backgroundColor: '$accents1' }}>
      <Modal.Header css={{ userSelect: 'none' }}>
        <Text>New Environment</Text>
      </Modal.Header>
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <Modal.Body>
          <Container
            fluid
            gap={0}
            css={{
              display: 'flex',
              flexWrap: 'nowrap',
              justifyContent: 'center',
              alignItems: 'flex-end',
            }}
          >
            <Input
              bordered
              size="sm"
              animated={false}
              label="Name"
              clearable
              css={{ flex: 1 }}
              color={errors.name ? 'error' : 'default'}
              {...register('name', { required: true })}
            />
            <Spacer />
            <ColorPickerInput
              value={watch('color')}
              onChange={(newColor) => setValue('color', newColor)}
            />
          </Container>

          <Input
            bordered
            size="sm"
            animated={false}
            label="URL"
            clearable
            css={{ flex: 1 }}
            color={errors.name ? 'error' : 'default'}
            {...register('url', { required: true })}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button auto bordered size="sm" color="error" onClick={onCloseHandler}>
            Cancel
          </Button>
          <Button auto bordered size="sm" color="gradient" type="submit">
            Create
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};
