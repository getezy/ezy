import { Container, Input, Spacer } from '@nextui-org/react';
import React from 'react';
import { useForm } from 'react-hook-form';

import { ColorPickerInput } from '../../components';
import { Workspace } from '../../storage';

export interface WorkspaceFormProps {
  id?: string;

  onSubmit: (payload: Workspace) => void;
}

export const WorkspaceForm: React.FC<WorkspaceFormProps> = ({ onSubmit = () => {}, id }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<Workspace>({ defaultValues: { color: '#00D7FF' } });

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
          <Spacer />
          <ColorPickerInput
            value={watch('color')}
            onChange={(newColor) => setValue('color', newColor)}
          />
        </Container>
      </Container>
    </form>
  );
};
