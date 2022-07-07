import { faListSquares, faSquarePlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Spacer, styled } from '@nextui-org/react';
import React from 'react';

import { CreateCollectionModal } from './collections';

const HeaderWrapper = styled('div', {
  display: 'flex',
  flexWrap: 'nowrap',
  alignItems: 'center',
  overflow: 'hidden',
});

export const Header: React.FC = () => {
  const [createCollectionModalVisible, setCreateCollectionModalVisible] = React.useState(false);

  return (
    <HeaderWrapper>
      <Spacer x={0.2} />
      <Button
        auto
        light
        size="xs"
        color="default"
        css={{ minWidth: 10 }}
        icon={<FontAwesomeIcon size="sm" icon={faListSquares} />}
      />
      <Spacer />
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
      <Spacer />
      <CreateCollectionModal
        closeButton
        blur
        open={createCollectionModalVisible}
        onClose={() => setCreateCollectionModalVisible(false)}
      />
    </HeaderWrapper>
  );
};
