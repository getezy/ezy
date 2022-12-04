import { Container, Input, Spacer } from '@nextui-org/react';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';

import { FileInput } from '@components';
import { Collection, CollectionType } from '@storage';

import { IncludeDirectoriesField } from './fields';

export interface CollectionFormProps {
  id?: string;

  defaultValues?: Partial<Collection<CollectionType>>;

  onSubmit: (payload: Collection<CollectionType>) => void;
}

export const CollectionForm: React.FC<CollectionFormProps> = ({
  onSubmit = () => {},
  id,
  defaultValues,
}) => {
  const {
    control,
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<Collection<CollectionType>>({ defaultValues });

  React.useEffect(() => {
    reset();
  }, [defaultValues]);

  return (
    <form id={id} onSubmit={handleSubmit(onSubmit)}>
      <Container
        gap={0}
        display="flex"
        direction="column"
        wrap="nowrap"
        css={{
          overflow: 'hidden',
          paddingLeft: 1,
          paddingRight: 1,
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
          color={errors.name ? 'error' : 'default'}
          {...register('name', { required: true })}
        />
        <Spacer />
        <Controller
          name="options.path"
          control={control}
          rules={{
            required: true,
          }}
          render={({ field }) => (
            <FileInput
              bordered
              borderWeight="light"
              buttonColor="default"
              size="sm"
              animated={false}
              label="Protobuf path"
              accept=".proto"
              color={errors.options?.path ? 'error' : 'default'}
              {...field}
            />
          )}
        />
        <Spacer />
        <Controller
          name="options.includeDirs"
          control={control}
          render={({ field }) => <IncludeDirectoriesField {...field} />}
        />
      </Container>
    </form>
  );
};
