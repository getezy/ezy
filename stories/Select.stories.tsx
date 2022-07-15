import { Container, Grid, Spacer, Text } from '@nextui-org/react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import { Select as SelectComponent } from '../src/app/components';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Select',
  component: SelectComponent,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof SelectComponent>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof SelectComponent> = () => (
  <Container>
    <Text b>Default</Text>
    <Grid.Container gap={5}>
      <Grid>
        <SelectComponent size="xs" />
        <Spacer />
        <SelectComponent size="sm" />
        <Spacer />
        <SelectComponent size="md" />
        <Spacer />
        <SelectComponent size="lg" />
        <Spacer />
        <SelectComponent size="xl" />
      </Grid>
    </Grid.Container>

    <Text b>Bordered</Text>
    <Grid.Container gap={5}>
      <Grid>
        <SelectComponent size="xs" bordered />
        <Spacer />
        <SelectComponent size="sm" bordered />
        <Spacer />
        <SelectComponent size="md" bordered />
        <Spacer />
        <SelectComponent size="lg" bordered />
        <Spacer />
        <SelectComponent size="xl" bordered />
      </Grid>
    </Grid.Container>
  </Container>
);

export const Select = Template.bind({});
