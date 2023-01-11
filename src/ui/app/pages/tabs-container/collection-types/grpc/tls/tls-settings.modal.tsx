import { faSquarePlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Container, Modal, ModalProps, Spacer, styled, Text } from '@nextui-org/react';
import React from 'react';
import { DeepPartial } from 'react-hook-form';
import { SetOptional } from 'type-fest';
import * as uuid from 'uuid';

import { GrpcTlsType, TlsPreset } from '@core';
import { DefaultLayout } from '@layouts';
import { useTlsPresetsStore } from '@new-storage';

import { TlsForm } from './tls.form';
import { TlsPresetsList } from './tls-presets-list';

const SideBarWrapper = styled('div', {
  display: 'flex',
  flexDirection: 'column',

  minWidth: 250,
  maxWidth: 250,
  background: '$background',
  borderRight: 'solid $border 1px',
});

const HeaderWrapper = styled('div', {
  background: '$background',
  borderBottom: 'solid $border 1px',
  paddingTop: 10,
  paddingBottom: 10,
});

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
  const { presets, upsertTlsPreset } = useTlsPresetsStore((store) => store);

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

  const handleSubmit = (payload: SetOptional<TlsPreset, 'id'>) => {
    const id = payload.id || uuid.v4();

    upsertTlsPreset({
      ...payload,
      id,
    });

    onApply(id);
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
    <HeaderWrapper>
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
    </HeaderWrapper>
  );

  const sidebar = (
    <SideBarWrapper>
      {header}
      <TlsPresetsList
        selectedTlsPresetId={formDefaultValues?.id}
        presets={presets}
        onTlsPresetChange={handleTlsPresetChange}
        onTlsPresetRemove={handleTlsPresetRemove}
      />
    </SideBarWrapper>
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
        <DefaultLayout left={sidebar}>
          <Container
            gap={0}
            fluid
            display="flex"
            wrap="nowrap"
            direction="column"
            css={{ flex: 1, overflow: 'hidden' }}
          >
            <Text css={{ alignSelf: 'center', userSelect: 'none', paddingTop: 10 }}>
              TLS Settings
            </Text>
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
                size="xs"
                color="error"
                onClick={handleCloseButtonClick}
              >
                Cancel
              </Button>
              <Spacer x={0.2} />
              <Button
                bordered
                borderWeight="light"
                size="xs"
                color="gradient"
                type="submit"
                form="tls-form"
                css={{
                  width: 100,
                }}
              >
                {formDefaultValues?.system ? 'Apply' : 'Save & Apply'}
              </Button>
            </Container>
          </Container>
        </DefaultLayout>
      </Modal.Body>
    </Modal>
  );
};
