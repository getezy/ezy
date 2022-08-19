import { faSquarePlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Container, Modal, ModalProps, Spacer, Text } from '@nextui-org/react';
import { nanoid } from 'nanoid';
import React from 'react';
import { DeepPartial } from 'react-hook-form';

import { GrpcTlsType } from '../../../../../../core/clients/grpc-client/interfaces/grpc-client.interface';
import { TlsPreset, useTlsPresetsStore } from '../../../../../storage';
import { Explorer } from '../../../../explorer';
import { TlsForm } from './tls.form';
import { TlsPresetsList } from './tls-presets-list';

export type TlsSettingsModalProps = ModalProps & {
  defaultValues?: DeepPartial<TlsPreset>;
  onApply: (id: string) => void;
  onClose: () => void;
};

export const TlsSettingsModal: React.FC<TlsSettingsModalProps> = ({
  onApply,
  onClose = () => {},
  defaultValues,
  ...props
}) => {
  const { presets, createTlsPreset } = useTlsPresetsStore((store) => store);

  const [formDefaultValues, setFormDefaultValues] = React.useState(defaultValues);
  const [formReadonly, setFormReadonly] = React.useState(!!defaultValues?.system);

  React.useEffect(() => {
    setFormDefaultValues(defaultValues);
    setFormReadonly(!!defaultValues?.system);
  }, [defaultValues]);

  const handleNewTlsButtonClick = () => {
    setFormDefaultValues({
      name: '',
      tls: {
        type: GrpcTlsType.SERVER_SIDE,
      },
    });

    setFormReadonly(false);
  };

  const handleSubmit = (payload: Omit<TlsPreset, 'id'> & Partial<Pick<TlsPreset, 'id'>>) => {
    if (payload.id) {
      onApply(payload.id);
    } else {
      const id = nanoid();
      createTlsPreset({
        id,
        ...payload,
      });

      onApply(id);
    }

    onClose();
  };

  const handleCloseButtonClick = () => {
    setFormDefaultValues(defaultValues);
    setFormReadonly(!!defaultValues?.system);
    onClose();
  };

  const handleTlsPresetChange = (id: string) => {
    const preset = presets.find((item) => item.id === id);
    if (preset) {
      setFormDefaultValues(preset);
      setFormReadonly(preset.system);
    }
  };

  const handleTlsPresetRemove = (id: string) => {
    if (id === formDefaultValues?.id) {
      const preset = presets.find((item) => item.system && item.tls.type === GrpcTlsType.INSECURE);
      if (preset) {
        handleTlsPresetChange(preset.id);
        onApply(preset.id);
      }
    }
  };

  const header = (
    <Container gap={0} fluid display="flex" justify="center" alignItems="center">
      <Button
        auto
        bordered
        borderWeight="light"
        color="gradient"
        size="sm"
        icon={<FontAwesomeIcon icon={faSquarePlus} />}
        onClick={handleNewTlsButtonClick}
      >
        New TLS preset
      </Button>
    </Container>
  );

  const sidebar = (
    <TlsPresetsList
      selectedTlsPresetId={formDefaultValues?.id}
      presets={presets}
      onTlsPresetChange={handleTlsPresetChange}
      onTlsPresetRemove={handleTlsPresetRemove}
    />
  );

  return (
    <Modal
      aria-labelledby="tls-settings-modal"
      onClose={handleCloseButtonClick}
      noPadding
      css={{ padding: 0, background: '$background' }}
      {...props}
    >
      <Modal.Body>
        <Explorer header={header} sideBar={sidebar}>
          <Container
            gap={0}
            fluid
            display="flex"
            wrap="nowrap"
            direction="column"
            css={{ flex: 1, overflow: 'hidden' }}
          >
            <Text css={{ userSelect: 'none', paddingTop: 10 }}>TLS Settings</Text>
            <TlsForm
              id="tls-form"
              defaultValues={formDefaultValues}
              isReadonly={formReadonly}
              onSubmit={handleSubmit}
            />
            <Container
              gap={0}
              fluid
              display="flex"
              direction="row"
              justify="flex-end"
              css={{
                alignSelf: 'flex-end',
                padding: 10,
              }}
            >
              <Button
                auto
                bordered
                borderWeight="light"
                size="sm"
                color="error"
                onClick={handleCloseButtonClick}
              >
                Cancel
              </Button>
              <Spacer x={0.2} />
              <Button
                auto
                bordered
                borderWeight="light"
                size="sm"
                color="gradient"
                type="submit"
                form="tls-form"
              >
                {formDefaultValues?.system ? 'Apply' : 'Save & Apply'}
              </Button>
            </Container>
          </Container>
        </Explorer>
      </Modal.Body>
    </Modal>
  );
};
