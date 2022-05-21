import { json } from '@codemirror/lang-json';
import { oneDark } from '@codemirror/theme-one-dark';
import { Container, Text } from '@nextui-org/react';
import CodeMirror from '@uiw/react-codemirror';
import React from 'react';

export const Request: React.FC = () => (
  <Container
    gap={0}
    fluid
    css={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
  >
    <Text h4>Request</Text>
    <Container gap={0} fluid css={{ display: 'flex' }}>
      <CodeMirror
        value="console.log('hello world!');"
        height="500px"
        width="500px"
        theme={oneDark}
        extensions={[json()]}
      />
    </Container>
  </Container>
);
