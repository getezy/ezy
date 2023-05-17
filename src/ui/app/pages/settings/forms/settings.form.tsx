import { Container, Dropdown } from '@nextui-org/react';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';

import { Theme } from '@core';
import { SettingsState } from '@new-storage';

export interface SettingsFormProps {
  id?: string;

  defaultValues?: Partial<SettingsState>;

  onSubmit: (payload: SettingsState) => void;
}

export const SettingsForm: React.FC<SettingsFormProps> = ({
  onSubmit = () => {},
  id,
  defaultValues,
}) => {
  const { handleSubmit, control } = useForm<SettingsState>({ defaultValues });

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
