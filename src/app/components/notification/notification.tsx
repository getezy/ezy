import { styled, Text } from '@nextui-org/react';
import React from 'react';
import { ToastContentProps } from 'react-toastify';

const NotificationWrapper = styled('div', {
  userSelect: 'none',
  maxWidth: '100%',
  overflowWrap: 'anywhere',
});

export type NotificationProps = {
  title?: string;
  desctiption: string;
} & Partial<ToastContentProps>;

export const Notification: React.FC<NotificationProps> = ({ title, desctiption }) => (
  <NotificationWrapper>
    <Text>{title}</Text>
    <Text small={!!title}>{desctiption}</Text>
  </NotificationWrapper>
);
