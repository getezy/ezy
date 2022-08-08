import { Container, Input, Radio, Spacer, Text } from '@nextui-org/react';
import React from 'react';
import { Controller, DeepRequired, FieldErrorsImpl, useForm } from 'react-hook-form';

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

export const TlsForm: React.FC<TlsFormProps> = ({
  onSubmit = () => {},
  id,
  defaultValues = { type: GrpcTlsType.MUTUAL },
}) => {
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    register,
  } = useForm<GrpcTlsConfig<GrpcTlsType>>({
    defaultValues,
  });

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
            <Controller
              name="rootCertificatePath"
              control={control}
              render={({ field }) => (
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
                  {...field}
                />
              )}
            />
          </>
        )}
        {watch('type') === GrpcTlsType.MUTUAL && (
          <>
            <Spacer />
            <Controller
              name="clientCertificatePath"
              control={control}
              rules={{
                required: watch('type') === GrpcTlsType.MUTUAL,
              }}
              render={({ field }) => (
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
                  {...field}
                />
              )}
            />
            <Spacer />
            <Controller
              name="clientKeyPath"
              control={control}
              rules={{
                required: watch('type') === GrpcTlsType.MUTUAL,
              }}
              render={({ field }) => (
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
                  {...field}
                />
              )}
            />
          </>
        )}
        {watch('type') !== GrpcTlsType.INSECURE && (
          <>
            <Spacer />
            <Text>Channel options</Text>
            <Input
              size="sm"
              bordered
              borderWeight="light"
              animated={false}
              clearable
              // @ts-ignore
              label={
                <InfoLabel
                  label="Override SSL target name (Optional)"
                  description="CN of the root certificate. It will be helpful when the actual server behind the proxy and CN don't match."
                />
              }
              {...register('channelOptions.sslTargetNameOverride')}
            />
          </>
        )}
      </Container>
    </form>
  );
};
