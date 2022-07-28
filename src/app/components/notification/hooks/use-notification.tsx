import { Text } from '@nextui-org/react';
import React from 'react';
import { Id, toast, ToastOptions } from 'react-toastify';

export type NotificationMessage = {
  title?: string;
  message: string;
};

export function useNotification() {
  function notification(notificationMessage: NotificationMessage, options?: ToastOptions): Id {
    return toast(
      <div>
        <Text>{notificationMessage.title}</Text>
        <Text small={!!notificationMessage.title}>{notificationMessage.message}</Text>
      </div>,
      options
    );
  }

  function closeNotification(id: Id): void {
    toast.dismiss(id);
  }

  function closeAllNotifications(): void {
    toast.dismiss();
  }

  return { notification, closeNotification, closeAllNotifications };
}
