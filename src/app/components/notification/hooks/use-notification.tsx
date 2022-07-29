import React from 'react';
import { Id, toast, ToastOptions } from 'react-toastify';

import { Notification } from '../notification';

export type NotificationMessage = {
  title?: string;
  message: string;
};

export function useNotification() {
  function notification(notificationMessage: NotificationMessage, options?: ToastOptions): Id {
    return toast(
      <Notification title={notificationMessage.title} message={notificationMessage.message} />,
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
