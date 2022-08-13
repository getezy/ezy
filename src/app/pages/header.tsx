import { faSquarePlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, styled } from '@nextui-org/react';
import React from 'react';

// import { useLogsStore } from '../storage';
import { CreateCollectionModal } from './collections';
// import { LogsButton, LogsModal } from './logs';

const HeaderWrapper = styled('div', {
  display: 'flex',
  flexWrap: 'nowrap',
  justifyContent: 'center',
  alignItems: 'center',
  overflow: 'hidden',
});

export const Header: React.FC = () => {
  const [createCollectionModalVisible, setCreateCollectionModalVisible] = React.useState(false);
  // const [logsModalVisible, setLogsModalVisible] = React.useState(false);
  // const { newLogsAvailable, markAsReadLogs } = useLogsStore((store) => store);

  // const handleLogsButtonClick = () => {
  //   setLogsModalVisible(true);
  //   markAsReadLogs();
  // };

  return (
    <HeaderWrapper>
      {/* <LogsButton badgeVisible={newLogsAvailable} onClick={handleLogsButtonClick} />
      <Spacer /> */}
      <Button
        auto
        bordered
        borderWeight="light"
        color="gradient"
        size="sm"
        icon={<FontAwesomeIcon icon={faSquarePlus} />}
        onClick={() => setCreateCollectionModalVisible(true)}
      >
        New collection
      </Button>
      <CreateCollectionModal
        fullScreen
        closeButton
        open={createCollectionModalVisible}
        onClose={() => setCreateCollectionModalVisible(false)}
      />
      {/* <LogsModal
        open={logsModalVisible}
        closeButton
        fullScreen
        scroll
        onClose={() => setLogsModalVisible(false)}
      /> */}
    </HeaderWrapper>
  );
};
