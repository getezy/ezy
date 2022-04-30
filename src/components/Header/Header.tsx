import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Container, Input, Spacer } from '@nextui-org/react';
import * as React from 'react';

export function Header() {
  return (
    <Container
      css={{
        display: 'flex',
        flexWrap: 'nowrap',
        marginTop: 20,
        marginBottom: 20,
      }}
    >
      <Spacer />
      <Input
        fullWidth
        clearable
        animated={false}
        size="sm"
        labelLeft="URL"
        placeholder="https://127.0.0.1:8080"
      />
      <Spacer />
      <Button
        bordered
        size="sm"
        color="gradient"
        iconRight={<FontAwesomeIcon icon={faPaperPlane} />}
      >
        Send
      </Button>
      <Spacer />
    </Container>
  );
}
