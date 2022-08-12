import { faSquarePlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Container, CSS, Grid, Modal, ModalProps, Spacer, Text } from '@nextui-org/react';
import React from 'react';

import {
  GrpcTlsConfig,
  GrpcTlsType,
} from '../../../../../../core/clients/grpc-client/interfaces/grpc-client.interface';
import { useTlsPresetsStore } from '../../../../../storage';
import { TlsForm } from './tls.form';
import { TlsPresetsList } from './tls-presets-list';

const PresetsListStyles: CSS = {
  minWidth: 250,
  maxWidth: 250,
  background: '$backgroundContrast',
  borderRight: 'solid $border 1px',
};

export type TlsSettingsModalProps = ModalProps & {
  selectedTlsPresetId?: string;
  defaultValues?: Partial<GrpcTlsConfig<GrpcTlsType>>;
  onCreate: (tls: GrpcTlsConfig<GrpcTlsType>) => void;
};

export const TlsSettingsModal: React.FC<TlsSettingsModalProps> = ({
  selectedTlsPresetId,
  onCreate,
  onClose = () => {},
  defaultValues,
  ...props
}) => {
  const presets = useTlsPresetsStore((store) => store.presets);

  const [formDefaultValues, setFormDefaultValues] = React.useState(defaultValues);
  // TODO: set readonly first
  const [formReadonly, setFormReadonly] = React.useState(false);

  const handleSubmit = (payload: GrpcTlsConfig<GrpcTlsType>) => {
    onCreate(payload);
  };

  const handleTlsPresetChange = (id: string) => {
    const preset = presets.find((item) => item.id === id);
    if (preset) {
      setFormDefaultValues(preset.tls);
      setFormReadonly(preset.system);
    }
  };

  return (
    <Modal
      {...props}
      aria-labelledby="tls-settings-modal"
      noPadding
      onClose={onClose}
      css={{ padding: 0 }}
    >
      <Modal.Body>
        <Grid.Container gap={0} wrap="nowrap" css={{ flex: 1, overflow: 'hidden' }}>
          <Grid css={PresetsListStyles}>
            <Container
              display="flex"
              justify="center"
              css={{ paddingTop: 10, paddingBottom: 10, borderBottom: 'solid $border 1px' }}
            >
              <Button
                auto
                bordered
                borderWeight="light"
                color="gradient"
                size="sm"
                icon={<FontAwesomeIcon icon={faSquarePlus} />}
              >
                New TLS preset
              </Button>
            </Container>
            <TlsPresetsList
              selectedTlsPresetId={selectedTlsPresetId}
              presets={presets}
              onTlsPresetChange={handleTlsPresetChange}
            />
          </Grid>
          <Grid direction="column" css={{ display: 'flex', flex: 1 }}>
            <Container fluid display="flex" justify="center" css={{ paddingTop: 10 }}>
              <Text css={{ userSelect: 'none' }}>TLS Settings</Text>
            </Container>
            <Container
              gap={0}
              display="flex"
              direction="column"
              css={{ flex: 1, overflow: 'hidden' }}
            >
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
                  onClick={onClose}
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
                  Apply
                </Button>
              </Container>
            </Container>
          </Grid>
        </Grid.Container>
      </Modal.Body>
    </Modal>
  );
};
