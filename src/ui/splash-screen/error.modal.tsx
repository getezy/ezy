import { Button, Container, Link, Modal, ModalProps, Text } from '@nextui-org/react';
import React from 'react';

import { CopyToClipboardButton } from '@components';

export type ErrorModalProps = {
  error: string;
} & ModalProps;

export const ErrorModal: React.FC<ErrorModalProps> = ({ error, ...props }) => {
  const handleQuitButtonClick = () => {
    window.splashScreen.quit();
  };

  return (
    <Modal blur aria-labelledby="error-modal" {...props} css={{ userSelect: 'none' }}>
      <Modal.Header>
        <Text size="$md" b>
          Something went wrong
        </Text>
      </Modal.Header>
      <Modal.Body css={{ padding: '5px 30px 0px 30px' }}>
        <Container gap={0} display="flex" direction="column">
          <Text size="$sm">There was an error occured while loading ezy.</Text>
          <Container gap={0} display="flex" direction="row">
            <Text size="$sm">Copy stack trace&nbsp;</Text>
            <CopyToClipboardButton content={error} />
            <Text size="$sm">&nbsp;and&nbsp;</Text>
            <Link
              href="https://github.com/getezy/ezy/issues/new?assignees=&labels=bug&template=---bug-report.md&title=%5BBUG%5D"
              target="_blank"
              isExternal
            >
              <Text size="$sm" css={{ color: '$link' }}>
                open an issue
              </Text>
            </Link>
            <Text size="$sm">&nbsp;on GitHub.</Text>
          </Container>
        </Container>
        <Text size="$xs" i>
          Our team will do the best to fix this issue as soon as possible. Right now you can
          manually downgrade the application to continue using ezy. We are sorry for that.
        </Text>
      </Modal.Body>
      <Modal.Footer>
        <Button size="xs" color="error" onClick={handleQuitButtonClick}>
          Quit
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
