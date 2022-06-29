import { Button, Modal, ModalProps, Spacer, Text } from '@nextui-org/react';
import React from 'react';

import { Badge } from '../../../components';
import { Collection, CollectionType, useCollectionsStore } from '../../../storage';
import { CollectionForm } from '../forms';

export const CreateCollectionModal: React.FC<ModalProps> = ({ onClose = () => {}, ...props }) => {
  const createCollection = useCollectionsStore((store) => store.createCollection);

  const handleSubmit = (payload: Collection<CollectionType>) => {
    createCollection(payload);
    onClose();
  };

  return (
    <Modal {...props} fullScreen onClose={onClose} css={{ backgroundColor: '$backgroundContrast' }}>
      <Modal.Header css={{ userSelect: 'none' }}>
        <Spacer />
        <Text>New Collection</Text>
        <Spacer />
        <Badge text="PROTO" color="primary" size="xs" bordered />
      </Modal.Header>
      <Modal.Body
        css={{
          '&::-webkit-scrollbar': {
            width: 2,
          },
          '&::-webkit-scrollbar-track': {
            backgroundColor: '$accents1',
          },
          '&::-webkit-scrollbar-thumb': {
            boxShadow: 'inset 0 0 6px',
            color: '$accents5',
          },
        }}
      >
        <CollectionForm id="create-collection-form" onSubmit={handleSubmit} />
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
          form="create-collection-form"
        >
          Create
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
