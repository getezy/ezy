import { Container, Dropdown } from '@nextui-org/react';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';

import { Theme } from '@database/types';
import { Settings } from '@new-storage';

export interface SettingsFormProps {
  id?: string;

  defaultValues?: Partial<Settings>;

  onSubmit: (payload: Settings) => void;
}

export const SettingsForm: React.FC<SettingsFormProps> = ({
  onSubmit = () => {},
  id,
  defaultValues,
}) => {
  const { handleSubmit, control } = useForm<Settings>({ defaultValues });

  return (
    <form id={id} onSubmit={handleSubmit(onSubmit)}>
      <Container gap={0} display="flex" direction="column" justify="center">
        <Controller
          name="theme"
          control={control}
          render={({ field }) => (
            <Dropdown>
              <Dropdown.Button
                bordered
                borderWeight="light"
                animated={false}
                color="gradient"
                size="xs"
                css={{
                  tt: 'capitalize',
                  '.nextui-drip .nextui-drip-filler': {
                    fill: '$ezy',
                  },
                }}
              >
                {field.value} Theme
              </Dropdown.Button>
              <Dropdown.Menu
                aria-label="theme"
                color="primary"
                disallowEmptySelection
                selectionMode="single"
                defaultSelectedKeys={defaultValues?.theme}
                onSelectionChange={(keys) => {
                  field.onChange(Array.from(keys).join(''));
                }}
              >
                <Dropdown.Item key={Theme.LIGHT}>Light</Dropdown.Item>
                <Dropdown.Item key={Theme.DARK}>Dark</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          )}
        />
      </Container>
    </form>
  );
};
