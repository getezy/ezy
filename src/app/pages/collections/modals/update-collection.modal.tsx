import { Button, Modal, ModalProps, Spacer, Text } from '@nextui-org/react';
import React from 'react';

import { Badge } from '../../../components';
import { Collection, CollectionType, useCollectionsStore } from '../../../storage';
import { CollectionForm } from '../forms';

export type UpdateCollectionModalProps = ModalProps & {
  defaultValues?: Partial<Collection<CollectionType>>;
};

export const UpdateCollectionModal: React.FC<UpdateCollectionModalProps> = ({
  onClose = () => {},
  defaultValues,
  ...props
}) => {
  const updateCollection = useCollectionsStore((store) => store.updateCollection);

  const handleSubmit = (payload: Collection<CollectionType>) => {
    updateCollection(payload.id, payload);
    onClose();
  };

  return (
    <Modal {...props} onClose={onClose} css={{ backgroundColor: 'transparent', maxHeight: '90vh' }}>
      <Modal.Header css={{ userSelect: 'none' }}>
        <Spacer />
        <Text>Update Collection</Text>
        <Spacer />
        <Badge text="PROTO" color="primary" size="xs" bordered />
      </Modal.Header>
      <Modal.Body>
        <CollectionForm
          id="update-collection-form"
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
          form="update-collection-form"
        >
          Update
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
