import { Container, Input, Spacer } from '@nextui-org/react';
import chroma from 'chroma-js';
import React from 'react';
import { useForm } from 'react-hook-form';

import { ColorPickerInput } from '@components';
import { Environment } from '@storage';

export interface EnvironmentFormProps {
  id?: string;

  defaultValues?: Partial<Omit<Environment, 'value'>>;

  onSubmit: (payload: Environment) => void;
}

export const EnvironmentForm: React.FC<EnvironmentFormProps> = ({
  onSubmit = () => {},
  id,
  defaultValues,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<Environment>({ defaultValues: { color: chroma.random().hex(), ...defaultValues } });

  return (
    <form id={id} onSubmit={handleSubmit(onSubmit)}>
      <Container gap={0} css={{ display: 'flex', flexDirection: 'column' }}>
        <Container
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
            color={errors.label ? 'error' : 'default'}
            {...register('label', { required: true })}
          />
          <Spacer />
          <ColorPickerInput
            value={watch('color')}
            onChange={(newColor) => setValue('color', newColor)}
          />
        </Container>
        <Spacer />
        <Input
          bordered
          borderWeight="light"
          size="sm"
          animated={false}
          label="URL"
          clearable
          color={errors.url ? 'error' : 'default'}
          {...register('url', { required: true })}
        />
      </Container>
    </form>
  );
};
