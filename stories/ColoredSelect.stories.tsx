import { Container, Grid, Spacer, Text } from '@nextui-org/react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import { ColoredSelect as ColoredSelectComponent } from '../src/app/components';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'ColoredSelect',
  component: ColoredSelectComponent,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof ColoredSelectComponent>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof ColoredSelectComponent> = () => (
  <Container>
    <Text b>Default</Text>
    <Grid.Container gap={5}>
      <Grid>
        <ColoredSelectComponent size="xs" />
        <Spacer />
        <ColoredSelectComponent size="sm" />
        <Spacer />
        <ColoredSelectComponent size="md" />
        <Spacer />
        <ColoredSelectComponent size="lg" />
        <Spacer />
        <ColoredSelectComponent size="xl" />
      </Grid>
    </Grid.Container>

    <Text b>Bordered</Text>
    <Grid.Container gap={5}>
      <Grid>
        <ColoredSelectComponent size="xs" bordered />
        <Spacer />
        <ColoredSelectComponent size="sm" bordered />
        <Spacer />
        <ColoredSelectComponent size="md" bordered />
        <Spacer />
        <ColoredSelectComponent size="lg" bordered />
        <Spacer />
        <ColoredSelectComponent size="xl" bordered />
      </Grid>
    </Grid.Container>
  </Container>
);

export const ColoredSelect = Template.bind({});
