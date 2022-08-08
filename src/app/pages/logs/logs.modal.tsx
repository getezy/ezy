import { faBroomBall } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Modal, ModalProps, styled, Text } from '@nextui-org/react';
import { nanoid } from 'nanoid';
import React from 'react';

import { useLogsStore } from '../../storage';

const LogItem = styled('div', {
  paddingLeft: 10,
  paddingRight: 10,
  '&:hover': {
    backgroundColor: '$accents1',
  },
});

export const LogsModal: React.FC<ModalProps> = ({ onClose = () => {}, ...props }) => {
  const { logs, clearLogs } = useLogsStore((store) => store);

  const content =
    logs.length > 0 ? (
      logs.map((log) => (
        <LogItem key={nanoid()}>
          <Text small css={{ whiteSpace: 'pre-line' }}>
            {log.message}
          </Text>
        </LogItem>
      ))
    ) : (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          height: '100%',
          alignItems: 'center',
        }}
      >
        <Text css={{ color: '$accents6' }}>No logs</Text>
      </div>
    );

  const handleClearButtonClick = () => {
    clearLogs();
  };

  return (
    <Modal {...props} aria-labelledby="logs-modal" onClose={onClose}>
      <Modal.Header
        css={{
          background: 'transparent',
          userSelect: 'none',
        }}
      >
        <Text>Logs</Text>
      </Modal.Header>
      <Modal.Body autoMargin={false} noPadding>
        {content}
      </Modal.Body>
      <Modal.Footer justify="space-between">
        <Button
          auto
          bordered
          borderWeight="light"
          size="sm"
          color="error"
          icon={<FontAwesomeIcon size="sm" icon={faBroomBall} />}
          onClick={handleClearButtonClick}
        >
          Clear
        </Button>
        <Button auto bordered borderWeight="light" size="sm" color="gradient" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
