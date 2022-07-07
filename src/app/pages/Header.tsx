import { faSquarePlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Spacer, styled } from '@nextui-org/react';
import React from 'react';

import { CreateCollectionModal } from './collections';
import { LogsButton, LogsModal } from './logs';

const HeaderWrapper = styled('div', {
  display: 'flex',
  flexWrap: 'nowrap',
  alignItems: 'center',
  overflow: 'hidden',
});

export const Header: React.FC = () => {
  const [createCollectionModalVisible, setCreateCollectionModalVisible] = React.useState(false);
  const [logsModalVisible, setLogsModalVisible] = React.useState(false);

  return (
    <HeaderWrapper>
      <LogsButton badgeVisible={false} onClick={() => setLogsModalVisible(true)} />
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
      <LogsModal
        open={logsModalVisible}
        closeButton
        fullScreen
        scroll
        onClose={() => setLogsModalVisible(false)}
      />
    </HeaderWrapper>
  );
};
