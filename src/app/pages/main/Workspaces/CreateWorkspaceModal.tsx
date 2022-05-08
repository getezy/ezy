import { Button, Container, Input, Modal, ModalProps, Spacer, Text } from '@nextui-org/react';
import React from 'react';
import { useForm } from 'react-hook-form';

import { ColorPickerInput } from '../../../components';
import { useWorkspacesStore, Workspace } from '../../../storage';

export const CreateWorkspaceModal: React.FC<ModalProps> = ({ onClose = () => {}, ...props }) => {
  const createWorkspace = useWorkspacesStore((store) => store.create);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<Workspace>({ defaultValues: { color: '#00D7FF' } });

  const onCloseHandler = () => {
    onClose();
    reset();
  };

  const onSubmitHandler = (payload: Workspace) => {
    createWorkspace(payload);
    onCloseHandler();
  };

  return (
    <Modal {...props} onClose={onCloseHandler} css={{ backgroundColor: '$accents1' }}>
      <Modal.Header css={{ userSelect: 'none' }}>
        <Text>New Workspace</Text>
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
