import { Button, Modal, ModalProps, Text } from '@nextui-org/react';
import React from 'react';

import { SettingsState, useAppStorage } from '@new-storage';

import { SettingsForm } from '../forms';

export const UpdateSettingsModal: React.FC<ModalProps> = ({ onClose = () => {}, ...props }) => {
  const { setTheme, theme } = useAppStorage((store) => store);

  const handleSubmit = async (payload: Partial<SettingsState>) => {
    if (payload.theme) {
      await setTheme(payload.theme);
    }

    onClose();
  };

  return (
    <Modal
      onClose={onClose}
      aria-labelledby="update-settings-modal"
      css={{ background: '$background' }}
      {...props}
    >
      <Modal.Header css={{ userSelect: 'none' }}>
        <Text>Settings</Text>
      </Modal.Header>
      <Modal.Body>
        <SettingsForm
          id="update-settings-form"
          defaultValues={{
            theme,
          }}
          onSubmit={handleSubmit}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button auto bordered borderWeight="light" size="xs" color="error" onClick={onClose}>
          Cancel
        </Button>
        <Button
          auto
          bordered
          borderWeight="light"
          size="xs"
          color="gradient"
          type="submit"
          form="update-settings-form"
        >
          Apply
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
