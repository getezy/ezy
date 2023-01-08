import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Spacer, styled, Text } from '@nextui-org/react';
import React from 'react';
import { ToastContentProps } from 'react-toastify';

import { CopyToClipboardButton } from '@components';

const NotificationWrapper = styled('div', {
  display: 'flex',
  flexDirection: 'column',

  maxWidth: '100%',

  userSelect: 'none',
  overflowWrap: 'anywhere',
});

const TitleWrapper = styled('div', {
  display: 'flex',
  flexWrap: 'nowrap',
});

const CommandsWrapper = styled('div', {
  display: 'flex',
  marginLeft: 'auto',
});

export type NotificationProps = {
  title: string;
  description?: string;
} & Partial<ToastContentProps>;

export const Notification: React.FC<NotificationProps> = ({ title, description, closeToast }) => (
  <NotificationWrapper>
    <TitleWrapper>
      <Text>{title}</Text>
      <CommandsWrapper>
        <CopyToClipboardButton content={description || title || ''} placement="leftEnd" />
        <Spacer x={0.2} />
        <Button
          light
          size="xs"
          color="warning"
          css={{
            minWidth: 10,
            color: '$accents9',
            '&:hover': {
              color: '$warning',
              backgroundColor: '$accents0',
            },
          }}
          icon={<FontAwesomeIcon icon={faXmark} />}
          onClick={closeToast}
        />
      </CommandsWrapper>
    </TitleWrapper>
    {description && <Text small>{description}</Text>}
  </NotificationWrapper>
);
