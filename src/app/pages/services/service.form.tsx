import { Container, Input } from '@nextui-org/react';
import React from 'react';
import { useForm } from 'react-hook-form';

import { Service } from '../../storage';

export interface ServiceFormProps {
  id?: string;

  onSubmit: (payload: Service) => void;
}

export const ServiceForm: React.FC<ServiceFormProps> = ({ onSubmit = () => {}, id }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Service>();

  return (
    <form id={id} onSubmit={handleSubmit(onSubmit)}>
      <Container gap={0} css={{ display: 'flex', flexDirection: 'column' }}>
        <Container
          fluid
          gap={0}
          css={{
            display: 'flex',
            flexWrap: 'nowrap',
            justifyContent: 'center',
            alignItems: 'flex-end',
          }}
        >
          <Input
            autoFocus
            bordered
            size="sm"
            animated={false}
            label="Name"
            clearable
            css={{ flex: 1 }}
            color={errors.name ? 'error' : 'default'}
            {...register('name', { required: true })}
          />
        </Container>
      </Container>
    </form>
  );
};
