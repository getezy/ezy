import { faCode } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Container, Spacer, Switch, Text } from '@nextui-org/react';
import * as React from 'react';
import ReactJson from 'react-json-view';

export function ResponseViewer() {
  return (
    <Container
      css={{
        display: 'flex',
        flexWrap: 'nowrap',
        minHeight: 0,
        userSelect: 'none',
        flexDirection: 'column',
      }}
    >
      <Container css={{ display: 'flex', flexDirection: 'row' }}>
        <Text> Response </Text>
        <Switch color="success" icon={<FontAwesomeIcon icon={faCode} />} />
      </Container>
      <Spacer />
      <ReactJson
        theme="bright"
        displayDataTypes={false}
        style={{ fontFamily: 'inherit', overflowY: 'auto' }}
        src={{
          string: 'this is a test string',
          integer: 42,
          array: [1, 2, 3, 'test', null],
          float: 3.14159,
          object: {
            'first-child': true,
            'second-child': false,
            'last-child': null,
          },
          string_number: '1234',
          date: '2022-04-28T08:41:16.420Z',
        }}
      />
    </Container>
  );
}
