import { Button, Modal, ModalProps, Spacer, Switch, Text } from '@nextui-org/react';
import React from 'react';

import { Badge } from '@components';
import { useCreateCollection } from '@hooks';
import { Collection, CollectionType } from '@storage';

import { CollectionForm } from '../forms';

export const CreateCollectionModal: React.FC<ModalProps> = ({ onClose = () => {}, ...props }) => {
  const { create } = useCreateCollection();
  const [isCreateMore, setIsCreateMore] = React.useState(false);
  const [defaultValues, setDefaultValues] = React.useState({});

  const handleSubmit = async (payload: Collection<CollectionType>) => {
    await create({
      ...payload,
      type: CollectionType.GRPC,
    });

    if (isCreateMore) {
      setDefaultValues({
        type: CollectionType.GRPC,
        options: {
          includeDirs: payload.options.includeDirs,
        },
      });
    } else {
      onClose();
    }
  };

  return (
    <Modal
      aria-labelledby="create-collection-modal"
      css={{ background: '$background' }}
      width="70%"
      onClose={onClose}
      {...props}
    >
      <Modal.Header css={{ userSelect: 'none' }}>
        <Spacer />
        <Text>New Collection</Text>
        <Spacer />
        <Badge text="PROTO" color="primary" size="xs" bordered />
      </Modal.Header>
      <Modal.Body>
        <CollectionForm
          id="create-collection-form"
          defaultValues={defaultValues}
          onSubmit={handleSubmit}
        />
      </Modal.Body>
      <Modal.Footer css={{ flexWrap: 'nowrap' }}>
        <Switch
          color="success"
          size="xs"
          onChange={(event) => setIsCreateMore(event.target.checked)}
        />
        <Text size="$xs" color="$accents8">
          Create more
        </Text>
        <Button
          bordered
          borderWeight="light"
          size="xs"
          color="gradient"
          type="submit"
          form="create-collection-form"
        >
          Create
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
