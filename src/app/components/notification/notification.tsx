import { styled, Text } from '@nextui-org/react';
import React from 'react';
import { ToastContainerProps } from 'react-toastify';

const NotificationWrapper = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  userSelect: 'none',
});

export type NotificationProps = {
  title?: string;
  message: string;
} & ToastContainerProps;

export const Notification: React.FC<NotificationProps> = ({ title, message }) => (
  <NotificationWrapper>
    <Text>{title}</Text>
    <Text small={!!title}>{message}</Text>
  </NotificationWrapper>
);
