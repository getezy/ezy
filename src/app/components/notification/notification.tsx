import { faClone, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Spacer, styled, Text } from '@nextui-org/react';
import React from 'react';
import { ToastContentProps } from 'react-toastify';
import { useCopyToClipboard } from 'react-use';

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
  title?: string;
  desctiption: string;
} & Partial<ToastContentProps>;

export const Notification: React.FC<NotificationProps> = ({ title, desctiption, closeToast }) => {
  const [, copyToClipboard] = useCopyToClipboard();
  const handleCopyButtonClick = () => copyToClipboard(desctiption || '');

  return (
    <NotificationWrapper>
      <TitleWrapper>
        <Text>{title}</Text>
        <CommandsWrapper>
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
            icon={<FontAwesomeIcon icon={faClone} />}
            onClick={handleCopyButtonClick}
          />
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
      <Text small={!!title}>{desctiption}</Text>
    </NotificationWrapper>
  );
};
