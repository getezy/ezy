import { faSquarePlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, styled } from '@nextui-org/react';
import React from 'react';

import { CreateCollectionModal } from './collections';

const HeaderWrapper = styled('div', {
  display: 'flex',
});

export const Header: React.FC = () => {
  const [createCollectionModalVisible, setCreateCollectionModalVisible] = React.useState(false);

  return (
    <HeaderWrapper>
      {/* <Button
        auto
        light
        size="sm"
        color="gradient"
        icon={<FontAwesomeIcon icon={faListSquares} />}
      /> */}
      <Button
        auto
        bordered
        borderWeight="light"
        color="gradient"
        size="sm"
        icon={<FontAwesomeIcon icon={faSquarePlus} />}
        onClick={() => setCreateCollectionModalVisible(true)}
      >
        Add collection
      </Button>
      <CreateCollectionModal
        closeButton
        blur
        open={createCollectionModalVisible}
        onClose={() => setCreateCollectionModalVisible(false)}
      />
    </HeaderWrapper>
  );
};
