import { Container, Grid, Spacer, Text } from '@nextui-org/react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import { ColorCircle as ColorCircleComponent } from '../src/app/components';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'ColorCircle',
  component: ColorCircleComponent,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof ColorCircleComponent>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof ColorCircleComponent> = () => (
  <Container>
    <Text b>Default</Text>
    <Grid.Container gap={5}>
      <Grid>
        <ColorCircleComponent size="xs" color="#302eb7" />
        <Spacer />
        <ColorCircleComponent size="sm" color="#302eb7" />
        <Spacer />
        <ColorCircleComponent size="md" color="#302eb7" />
        <Spacer />
        <ColorCircleComponent size="lg" color="#302eb7" />
        <Spacer />
        <ColorCircleComponent size="xl" color="#302eb7" />
        <Spacer />
      </Grid>
    </Grid.Container>
  </Container>
);

export const ColorCircle = Template.bind({});
