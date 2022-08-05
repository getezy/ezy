import { Container, Radio } from '@nextui-org/react';
import React from 'react';
import { useForm } from 'react-hook-form';

import {
  GrpcTlsConfig,
  GrpcTlsType,
} from '../../../../../../core/clients/grpc-client/interfaces/grpc-client.interface';

export interface TlsFormProps {
  id?: string;

  defaultValues?: Partial<GrpcTlsConfig<GrpcTlsType>>;

  onSubmit: (payload: GrpcTlsConfig<GrpcTlsType>) => void;
}

export const TlsForm: React.FC<TlsFormProps> = ({ onSubmit = () => {}, id, defaultValues }) => {
  const { handleSubmit } = useForm<GrpcTlsConfig<GrpcTlsType>>({
    defaultValues,
  });

  return (
    <form id={id} onSubmit={handleSubmit(onSubmit)}>
      <Container gap={0} css={{ display: 'flex', flexDirection: 'column' }}>
        <Radio.Group orientation="horizontal" label="TLS type" defaultValue="server-side">
          <Radio value="server-side" />
          <Radio value="mutual" />
        </Radio.Group>
      </Container>
    </form>
  );
};
