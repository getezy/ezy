import * as React from 'react';
import { Container } from '@nextui-org/react';

export function Explorer() {
  return (
    <Container css={{ borderColor: '$red100', border: 'solid 1px', height: '100%' }}>
      <ul>
        <li>Service A</li>
        <li>Service B</li>
        <li>Service C</li>
      </ul>
    </Container>
  )
}

