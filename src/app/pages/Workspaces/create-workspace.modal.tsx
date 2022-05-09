import { Button, Modal, ModalProps, Text } from '@nextui-org/react';
import React from 'react';

import { useWorkspacesStore, Workspace } from '../../storage';
import { WorkspaceForm } from './workspace.form';

export const CreateWorkspaceModal: React.FC<ModalProps> = ({ onClose = () => {}, ...props }) => {
  const createWorkspace = useWorkspacesStore((store) => store.create);

  const handleSubmit = (payload: Workspace) => {
    createWorkspace(payload);
    onClose();
  };

  return (
    <Modal {...props} onClose={onClose} css={{ backgroundColor: '$accents1' }}>
      <Modal.Header css={{ userSelect: 'none' }}>
        <Text>New Workspace</Text>
      </Modal.Header>
      <Modal.Body>
        <WorkspaceForm id="create-wrokspace-form" onSubmit={handleSubmit} />
      </Modal.Body>
      <Modal.Footer>
        <Button auto bordered size="sm" color="error" onClick={onClose}>
          Cancel
        </Button>
        <Button auto bordered size="sm" color="gradient" type="submit" form="create-wrokspace-form">
          Create
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
