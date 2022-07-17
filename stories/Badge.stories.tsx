import { faFill } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Container, Grid, Spacer, Text } from '@nextui-org/react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import { Badge as BadgeComponent } from '../src/app/components';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Badge',
  component: BadgeComponent,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof BadgeComponent>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof BadgeComponent> = () => {
  const icon = <FontAwesomeIcon icon={faFill} />;

  return (
    <Container>
      <Text b>Default</Text>
      <Grid.Container gap={5}>
        <Grid>
          <BadgeComponent size="xs" color="primary" text="badge" />
          <Spacer />
          <BadgeComponent size="sm" color="primary" text="badge" />
          <Spacer />
          <BadgeComponent size="md" color="primary" text="badge" />
          <Spacer />
          <BadgeComponent size="lg" color="primary" text="badge" />
          <Spacer />
          <BadgeComponent size="xl" color="primary" text="badge" />
        </Grid>
        <Grid>
          <BadgeComponent size="xs" color="secondary" text="badge" />
          <Spacer />
          <BadgeComponent size="sm" color="secondary" text="badge" />
          <Spacer />
          <BadgeComponent size="md" color="secondary" text="badge" />
          <Spacer />
          <BadgeComponent size="lg" color="secondary" text="badge" />
          <Spacer />
          <BadgeComponent size="xl" color="secondary" text="badge" />
        </Grid>
        <Grid>
          <BadgeComponent size="xs" color="success" text="badge" />
          <Spacer />
          <BadgeComponent size="sm" color="success" text="badge" />
          <Spacer />
          <BadgeComponent size="md" color="success" text="badge" />
          <Spacer />
          <BadgeComponent size="lg" color="success" text="badge" />
          <Spacer />
          <BadgeComponent size="xl" color="success" text="badge" />
        </Grid>
        <Grid>
          <BadgeComponent size="xs" color="warning" text="badge" />
          <Spacer />
          <BadgeComponent size="sm" color="warning" text="badge" />
          <Spacer />
          <BadgeComponent size="md" color="warning" text="badge" />
          <Spacer />
          <BadgeComponent size="lg" color="warning" text="badge" />
          <Spacer />
          <BadgeComponent size="xl" color="warning" text="badge" />
        </Grid>
        <Grid>
          <BadgeComponent size="xs" color="error" text="badge" />
          <Spacer />
          <BadgeComponent size="sm" color="error" text="badge" />
          <Spacer />
          <BadgeComponent size="md" color="error" text="badge" />
          <Spacer />
          <BadgeComponent size="lg" color="error" text="badge" />
          <Spacer />
          <BadgeComponent size="xl" color="error" text="badge" />
        </Grid>
      </Grid.Container>

      <Text b>Bordered</Text>
      <Grid.Container gap={5}>
        <Grid>
          <BadgeComponent size="xs" color="primary" bordered text="badge" />
          <Spacer />
          <BadgeComponent size="sm" color="primary" bordered text="badge" />
          <Spacer />
          <BadgeComponent size="md" color="primary" bordered text="badge" />
          <Spacer />
          <BadgeComponent size="lg" color="primary" bordered text="badge" />
          <Spacer />
          <BadgeComponent size="xl" color="primary" bordered text="badge" />
        </Grid>
        <Grid>
          <BadgeComponent size="xs" color="secondary" bordered text="badge" />
          <Spacer />
          <BadgeComponent size="sm" color="secondary" bordered text="badge" />
          <Spacer />
          <BadgeComponent size="md" color="secondary" bordered text="badge" />
          <Spacer />
          <BadgeComponent size="lg" color="secondary" bordered text="badge" />
          <Spacer />
          <BadgeComponent size="xl" color="secondary" bordered text="badge" />
        </Grid>
        <Grid>
          <BadgeComponent size="xs" color="success" bordered text="badge" />
          <Spacer />
          <BadgeComponent size="sm" color="success" bordered text="badge" />
          <Spacer />
          <BadgeComponent size="md" color="success" bordered text="badge" />
          <Spacer />
          <BadgeComponent size="lg" color="success" bordered text="badge" />
          <Spacer />
          <BadgeComponent size="xl" color="success" bordered text="badge" />
        </Grid>
        <Grid>
          <BadgeComponent size="xs" color="warning" bordered text="badge" />
          <Spacer />
          <BadgeComponent size="sm" color="warning" bordered text="badge" />
          <Spacer />
          <BadgeComponent size="md" color="warning" bordered text="badge" />
          <Spacer />
          <BadgeComponent size="lg" color="warning" bordered text="badge" />
          <Spacer />
          <BadgeComponent size="xl" color="warning" bordered text="badge" />
        </Grid>
        <Grid>
          <BadgeComponent size="xs" color="error" bordered text="badge" />
          <Spacer />
          <BadgeComponent size="sm" color="error" bordered text="badge" />
          <Spacer />
          <BadgeComponent size="md" color="error" bordered text="badge" />
          <Spacer />
          <BadgeComponent size="lg" color="error" bordered text="badge" />
          <Spacer />
          <BadgeComponent size="xl" color="error" bordered text="badge" />
        </Grid>
      </Grid.Container>

      <Text b>Icon</Text>
      <Grid.Container gap={5}>
        <Grid>
          <BadgeComponent size="xs" color="primary" bordered text="badge" icon={icon} />
          <Spacer />
          <BadgeComponent size="sm" color="primary" bordered text="badge" icon={icon} />
          <Spacer />
          <BadgeComponent size="md" color="primary" bordered text="badge" icon={icon} />
          <Spacer />
          <BadgeComponent size="lg" color="primary" bordered text="badge" icon={icon} />
          <Spacer />
          <BadgeComponent size="xl" color="primary" bordered text="badge" icon={icon} />
        </Grid>
        <Grid>
          <BadgeComponent size="xs" color="secondary" bordered text="badge" icon={icon} />
          <Spacer />
          <BadgeComponent size="sm" color="secondary" bordered text="badge" icon={icon} />
          <Spacer />
          <BadgeComponent size="md" color="secondary" bordered text="badge" icon={icon} />
          <Spacer />
          <BadgeComponent size="lg" color="secondary" bordered text="badge" icon={icon} />
          <Spacer />
          <BadgeComponent size="xl" color="secondary" bordered text="badge" icon={icon} />
        </Grid>
        <Grid>
          <BadgeComponent size="xs" color="success" bordered text="badge" icon={icon} />
          <Spacer />
          <BadgeComponent size="sm" color="success" bordered text="badge" icon={icon} />
          <Spacer />
          <BadgeComponent size="md" color="success" bordered text="badge" icon={icon} />
          <Spacer />
          <BadgeComponent size="lg" color="success" bordered text="badge" icon={icon} />
          <Spacer />
          <BadgeComponent size="xl" color="success" bordered text="badge" icon={icon} />
        </Grid>
        <Grid>
          <BadgeComponent size="xs" color="warning" bordered text="badge" icon={icon} />
          <Spacer />
          <BadgeComponent size="sm" color="warning" bordered text="badge" icon={icon} />
          <Spacer />
          <BadgeComponent size="md" color="warning" bordered text="badge" icon={icon} />
          <Spacer />
          <BadgeComponent size="lg" color="warning" bordered text="badge" icon={icon} />
          <Spacer />
          <BadgeComponent size="xl" color="warning" bordered text="badge" icon={icon} />
        </Grid>
        <Grid>
          <BadgeComponent size="xs" color="error" bordered text="badge" icon={icon} />
          <Spacer />
          <BadgeComponent size="sm" color="error" bordered text="badge" icon={icon} />
          <Spacer />
          <BadgeComponent size="md" color="error" bordered text="badge" icon={icon} />
          <Spacer />
          <BadgeComponent size="lg" color="error" bordered text="badge" icon={icon} />
          <Spacer />
          <BadgeComponent size="xl" color="error" bordered text="badge" icon={icon} />
        </Grid>
      </Grid.Container>
    </Container>
  );
};

export const Badge = Template.bind({});
