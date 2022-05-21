import { Container, Switch, Text } from '@nextui-org/react';
import React from 'react';

import { HorizontalLayoutIcon, VerticalLayoutIcon } from '../../../components';

export const Response: React.FC = () => (
  <Container fluid css={{ display: 'flex', justifyContent: 'center', alignContent: 'baseline' }}>
    <Text h4>Response</Text>
    <Switch
      color="success"
      size="sm"
      bordered
      iconOff={<HorizontalLayoutIcon />}
      iconOn={<VerticalLayoutIcon />}
    />
  </Container>
);
