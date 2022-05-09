import { faSquarePlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from '@nextui-org/react';
import React from 'react';

import { CreateWorkspaceModal } from './Workspaces';

export const Header: React.FC = () => {
  const [createWorkspaceModalVisible, setCreateWorkspaceModalVisible] = React.useState(false);

  return (
    <div>
      <Button
        auto
        bordered
        color="gradient"
        size="sm"
        icon={<FontAwesomeIcon icon={faSquarePlus} />}
        onClick={() => setCreateWorkspaceModalVisible(true)}
      >
        Create workspace
      </Button>
      <CreateWorkspaceModal
        closeButton
        preventClose
        blur
        open={createWorkspaceModalVisible}
        onClose={() => setCreateWorkspaceModalVisible(false)}
      />
    </div>
  );
};
