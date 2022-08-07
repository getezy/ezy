import { Container, Radio, Spacer } from '@nextui-org/react';
import React from 'react';
import { DeepRequired, FieldErrorsImpl, useForm } from 'react-hook-form';

import {
  GrpcTlsConfig,
  GrpcTlsType,
} from '../../../../../../core/clients/grpc-client/interfaces/grpc-client.interface';
import { FileInput, InfoLabel } from '../../../../../components';

export interface TlsFormProps {
  id?: string;

  defaultValues?: Partial<GrpcTlsConfig<GrpcTlsType>>;

  onSubmit: (payload: GrpcTlsConfig<GrpcTlsType>) => void;
}

function getError(
  errors: FieldErrorsImpl<DeepRequired<GrpcTlsConfig<GrpcTlsType>>>,
  field: 'clientCertificatePath' | 'clientKeyPath'
) {
  if (field in errors) {
    // @ts-ignore
    return errors[field];
  }

  return undefined;
}

function getDefaultValue(
  defaultValues: Partial<GrpcTlsConfig<GrpcTlsType>>,
  field: 'rootCertificatePath' | 'clientCertificatePath' | 'clientKeyPath'
) {
  if (field in defaultValues) {
    // @ts-ignore
    return defaultValues[field];
  }

  return undefined;
}

export const TlsForm: React.FC<TlsFormProps> = ({
  onSubmit = () => {},
  id,
  defaultValues = { type: GrpcTlsType.INSECURE },
}) => {
  const {
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    register,
  } = useForm<GrpcTlsConfig<GrpcTlsType>>({
    defaultValues,
  });

  React.useEffect(() => {
    register('clientCertificatePath', { required: watch('type') === GrpcTlsType.MUTUAL });
    register('clientKeyPath', { required: watch('type') === GrpcTlsType.MUTUAL });
  }, [register, watch('type')]);

  return (
    <form id={id} onSubmit={handleSubmit(onSubmit)}>
      <Container gap={0} css={{ display: 'flex', flexDirection: 'column' }}>
        <Radio.Group
          orientation="horizontal"
          label="TLS type"
          defaultValue={GrpcTlsType.INSECURE}
          value={watch('type')}
          onChange={(type) => setValue('type', type as GrpcTlsType)}
        >
          <Radio value={GrpcTlsType.INSECURE} size="sm">
            Insecure
          </Radio>
          <Radio value={GrpcTlsType.SERVER_SIDE} size="sm">
            Server-side
          </Radio>
          <Radio value={GrpcTlsType.MUTUAL} size="sm">
            Mutual
          </Radio>
        </Radio.Group>
        {watch('type') !== GrpcTlsType.INSECURE && (
          <>
            <Spacer />
            <FileInput
              bordered
              borderWeight="light"
              buttonColor="default"
              size="sm"
              animated={false}
              // @ts-ignore
              label={
                <InfoLabel
                  label="Root certificate (Optional)"
                  description="Certificate of the CA who signed the server's certificate or root server certificate."
                />
              }
              readOnly
              value={watch(
                'rootCertificatePath',
                getDefaultValue(defaultValues, 'rootCertificatePath') || ''
              )}
              onChange={(path) => setValue('rootCertificatePath', path)}
            />
          </>
        )}
        {watch('type') === GrpcTlsType.MUTUAL && (
          <>
            <Spacer />
            <FileInput
              bordered
              borderWeight="light"
              buttonColor="default"
              size="sm"
              animated={false}
              // @ts-ignore
              label={
                <InfoLabel
                  label="Client certificate"
                  description="Public client key signed by CA."
                  color={getError(errors, 'clientCertificatePath') ? 'error' : 'default'}
                />
              }
              readOnly
              value={watch(
                'clientCertificatePath',
                getDefaultValue(defaultValues, 'clientCertificatePath') || ''
              )}
              onChange={(path) => setValue('clientCertificatePath', path)}
            />

            <Spacer />
            <FileInput
              bordered
              borderWeight="light"
              buttonColor="default"
              size="sm"
              animated={false}
              // @ts-ignore
              label={
                <InfoLabel
                  label="Client key"
                  description="Private client key for client certificate."
                  color={getError(errors, 'clientKeyPath') ? 'error' : 'default'}
                />
              }
              readOnly
              value={watch('clientKeyPath', getDefaultValue(defaultValues, 'clientKeyPath') || '')}
              onChange={(path) => setValue('clientKeyPath', path)}
            />
          </>
        )}
      </Container>
    </form>
  );
};
