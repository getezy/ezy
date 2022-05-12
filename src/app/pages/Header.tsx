import { faSquarePlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from '@nextui-org/react';
import React from 'react';

import { CreateServiceModal } from './services';

export const Header: React.FC = () => {
  const [createServiceModalVisible, setCreateServiceModalVisible] = React.useState(false);

  return (
    <div>
      <Button
        auto
        bordered
        color="gradient"
        size="sm"
        icon={<FontAwesomeIcon icon={faSquarePlus} />}
        onClick={() => setCreateServiceModalVisible(true)}
      >
        Create service
      </Button>
      <CreateServiceModal
        closeButton
        preventClose
        blur
        open={createServiceModalVisible}
        onClose={() => setCreateServiceModalVisible(false)}
      />
    </div>
  );
};
