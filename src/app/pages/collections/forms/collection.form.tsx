import { Container, Input } from '@nextui-org/react';
import React from 'react';
import { useForm } from 'react-hook-form';

import { Collection, CollectionType } from '../../../storage';

export interface CollectionFormProps {
  id?: string;

  onSubmit: (payload: Collection<CollectionType>) => void;
}

export const CollectionForm: React.FC<CollectionFormProps> = ({ onSubmit = () => {}, id }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Collection<CollectionType>>();

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
            borderWeight="light"
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
