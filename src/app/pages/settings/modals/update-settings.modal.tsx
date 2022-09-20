import { Button, Modal, ModalProps, Text } from '@nextui-org/react';
import { Settings, useSettingsStore } from '@storage';
import React from 'react';

import { SettingsForm } from '../forms';

export const UpdateSettingsModal: React.FC<ModalProps> = ({ onClose = () => {}, ...props }) => {
  const { updateTheme, theme } = useSettingsStore((store) => store);

  const handleSubmit = async (payload: Partial<Settings>) => {
    if (payload.theme) {
      await updateTheme(payload.theme);
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
        <Button auto bordered borderWeight="light" size="sm" color="error" onClick={onClose}>
          Cancel
        </Button>
        <Button
          auto
          bordered
          borderWeight="light"
          size="sm"
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
