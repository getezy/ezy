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
  minWidth: 200,
  maxWidth: 200,
  background: '$backgroundContrast',
  borderRight: 'solid $border 1px',
};

export type TlsSettingsModalProps = ModalProps & {
  defaultValues?: Partial<GrpcTlsConfig<GrpcTlsType>>;
  onCreate: (tls: GrpcTlsConfig<GrpcTlsType>) => void;
};

export const TlsSettingsModal: React.FC<TlsSettingsModalProps> = ({
  onCreate,
  onClose = () => {},
  defaultValues,
  ...props
}) => {
  const presets = useTlsPresetsStore((store) => store.presets);

  const handleSubmit = (payload: GrpcTlsConfig<GrpcTlsType>) => {
    onCreate(payload);
  };

  return (
    <Modal {...props} aria-labelledby="tls-settings-modal" noPadding onClose={onClose}>
      {/* <Modal.Header css={{ userSelect: 'none' }}>
        <Text>TLS Settings</Text>
      </Modal.Header> */}
      <Modal.Body>
        {/* <div
          style={{
            display: 'flex',
            flex: 1,
            background: 'red',
            flexDirection: 'column',
            overflow: 'hidden',
          }}
        >
          <div style={{ display: 'flex', flex: 1, background: 'blue', overflow: 'auto' }}>
            <Text>{'loremipsum\n'.repeat(200)}</Text>
          </div>
          <div style={{ display: 'flex', background: 'green', justifyContent: 'flex-end' }}>
            <Button>Test</Button>
          </div>
        </div> */}
        <Grid.Container gap={0} wrap="nowrap" css={{ flex: 1, overflow: 'hidden' }}>
          <Grid css={PresetsListStyles}>
            <TlsPresetsList presets={presets} />
          </Grid>
          <Grid direction="column" css={{ display: 'flex', flex: 1 }}>
            <Container fluid display="flex" justify="center">
              <Text css={{ userSelect: 'none' }}>TLS Settings</Text>
            </Container>
            <Container
              gap={0}
              display="flex"
              direction="column"
              css={{ flex: 1, overflow: 'hidden' }}
            >
              <TlsForm id="tls-form" defaultValues={defaultValues} onSubmit={handleSubmit} />
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
                  Save
                </Button>
              </Container>
            </Container>
          </Grid>
        </Grid.Container>
      </Modal.Body>
    </Modal>
  );
};
