import { Button, Modal, ModalProps, Text } from '@nextui-org/react';
import React from 'react';

import { Collection, CollectionType, useCollectionsStore } from '../../../storage';
import { CollectionForm } from '../forms';

export const CreateCollectionModal: React.FC<ModalProps> = ({ onClose = () => {}, ...props }) => {
  const createCollection = useCollectionsStore((store) => store.createCollection);

  const handleSubmit = (payload: Collection<CollectionType>) => {
    createCollection(payload);
    onClose();
  };

  return (
    <Modal {...props} onClose={onClose} css={{ backgroundColor: '$backgroundContrast' }}>
      <Modal.Header css={{ userSelect: 'none' }}>
        <Text>New Collection</Text>
      </Modal.Header>
      <Modal.Body>
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
