import { Badge, FileInput, InfoLabel } from '@components';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Card, Container, Input, Radio, Spacer, styled, Text } from '@nextui-org/react';
import React from 'react';
import { Controller, DeepPartial, useForm } from 'react-hook-form';

import { GrpcTlsType } from '../../../../../../core/clients/grpc/interfaces';
import { TlsPreset } from '../../../../../storage';

export interface TlsFormProps {
  id?: string;

  isReadonly?: boolean;

  defaultValues?: DeepPartial<TlsPreset>;

  onSubmit: (payload: Omit<TlsPreset, 'id'> & Partial<Pick<TlsPreset, 'id'>>) => void;
}

const StyledInfoIcon = styled(FontAwesomeIcon, {
  color: '$warning',
});

const SystemCard: React.FC = () => (
  <Container fluid gap={0}>
    <Spacer />
    <Card variant="bordered" isHoverable>
      <Card.Body>
        <Container gap={0} display="flex" direction="row" wrap="nowrap" alignItems="center">
          <StyledInfoIcon icon={faCircleInfo} />
          <Spacer x={0.5} />
          <Text small css={{ margin: 0 }}>
            This is system TLS preset and it couldn`t be changed. For use custom preset create one.
          </Text>
        </Container>
      </Card.Body>
    </Card>
    <Spacer />
  </Container>
);

export const TlsForm: React.FC<TlsFormProps> = ({
  onSubmit = () => {},
  id,
  isReadonly = false,
  defaultValues,
}) => {
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    register,
    reset,
  } = useForm<TlsPreset>({
    defaultValues,
  });

  React.useEffect(() => {
    reset(defaultValues);
  }, [defaultValues]);

  const handleTlsTypeChange = (type: string) => {
    reset({
      tls: {
        rootCertificatePath: undefined,
        clientCertificatePath: undefined,
        clientKeyPath: undefined,
        channelOptions: undefined,
      },
    });

    setValue('tls.type', type as GrpcTlsType);
  };

  return (
    <form
      id={id}
      onSubmit={handleSubmit(onSubmit)}
      style={{ display: 'flex', flex: 1, overflow: 'auto' }}
    >
      <Container
        fluid
        gap={1}
        display="flex"
        direction="column"
        wrap="nowrap"
        css={{ overflow: 'auto', flex: 1 }}
      >
        {defaultValues?.system && <SystemCard />}
        <Input
          aria-label="preset-name-input"
          size="sm"
          bordered
          borderWeight="light"
          animated={false}
          clearable={!isReadonly}
          readOnly={isReadonly}
          color={errors.name ? 'error' : 'default'}
          label="Name"
          {...register('name', { required: true })}
        />
        <Spacer />
        <Radio.Group
          aria-label="tls-type-radio"
          orientation="horizontal"
          label="TLS type"
          defaultValue={GrpcTlsType.INSECURE}
          value={watch('tls.type')}
          onChange={handleTlsTypeChange}
          isReadOnly={isReadonly}
        >
          {defaultValues?.system && (
            <Radio value={GrpcTlsType.INSECURE} size="sm">
              Insecure
            </Radio>
          )}
          <Radio value={GrpcTlsType.SERVER_SIDE} size="sm">
            Server-side
          </Radio>
          <Radio value={GrpcTlsType.MUTUAL} size="sm">
            Mutual
          </Radio>
        </Radio.Group>
        {watch('tls.type') !== GrpcTlsType.INSECURE && (
          <>
            <Spacer />
            <Controller
              name="tls.rootCertificatePath"
              control={control}
              render={({ field }) => (
                <FileInput
                  aria-label="root-certificate-path-input"
                  bordered
                  borderWeight="light"
                  buttonColor="default"
                  size="sm"
                  animated={false}
                  readOnly={isReadonly}
                  // @ts-ignore
                  label={
                    <InfoLabel
                      label="Root certificate (Optional)"
                      description="Certificate of the CA who signed the server's certificate or root server certificate."
                    />
                  }
                  {...field}
                />
              )}
            />
          </>
        )}
        {watch('tls.type') === GrpcTlsType.MUTUAL && (
          <>
            <Spacer />
            <Controller
              name="tls.clientCertificatePath"
              control={control}
              rules={{
                required: watch('tls.type') === GrpcTlsType.MUTUAL,
              }}
              render={({ field }) => (
                <FileInput
                  aria-label="client-certificate-path-input"
                  bordered
                  borderWeight="light"
                  buttonColor="default"
                  size="sm"
                  animated={false}
                  readOnly={isReadonly}
                  // @ts-ignore
                  color={errors.tls?.clientCertificatePath ? 'error' : 'default'}
                  // @ts-ignore
                  label={
                    <InfoLabel
                      label="Client certificate"
                      description="Public client key signed by CA."
                      // @ts-ignore
                      color={errors.tls?.clientCertificatePath ? 'error' : 'default'}
                    />
                  }
                  {...field}
                />
              )}
            />
            <Spacer />
            <Controller
              name="tls.clientKeyPath"
              control={control}
              rules={{
                required: watch('tls.type') === GrpcTlsType.MUTUAL,
              }}
              render={({ field }) => (
                <FileInput
                  aria-label="client-certificate-key-path-input"
                  bordered
                  borderWeight="light"
                  buttonColor="default"
                  size="sm"
                  animated={false}
                  clearable={!isReadonly}
                  readOnly={isReadonly}
                  // @ts-ignore
                  color={errors.tls?.clientKeyPath ? 'error' : 'default'}
                  // @ts-ignore
                  label={
                    <InfoLabel
                      label="Client key"
                      description="Private client key for client certificate."
                      // @ts-ignore
                      color={errors.tls?.clientKeyPath ? 'error' : 'default'}
                    />
                  }
                  {...field}
                />
              )}
            />
          </>
        )}
        {watch('tls.type') !== GrpcTlsType.INSECURE && (
          <>
            <Spacer />
            <Container gap={0} display="flex" alignItems="center">
              <Text css={{ margin: 0, color: '$accents8' }}>Channel options</Text>
              <Spacer x={0.2} />
              <Badge text="gRPC" color="primary" size="xs" bordered />
            </Container>
            <Input
              aria-label="ssl-target-name-override-input"
              size="sm"
              bordered
              borderWeight="light"
              animated={false}
              clearable={!isReadonly}
              readOnly={isReadonly}
              // @ts-ignore
              label={
                <InfoLabel
                  label="Override SSL target name (Optional)"
                  description="CN of the root certificate. It will be helpful when the actual server behind the proxy and CN don't match."
                />
              }
              css={{ paddingBottom: 10 }}
              {...register('tls.channelOptions.sslTargetNameOverride')}
            />
          </>
        )}
      </Container>
    </form>
  );
};
