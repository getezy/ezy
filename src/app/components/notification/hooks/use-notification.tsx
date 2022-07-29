import React from 'react';
import { Id, toast, ToastOptions } from 'react-toastify';

import { Notification } from '../notification';

export type NotificationMessage = {
  title?: string;
  desctiption: string;
};

export function useNotification() {
  function notification(message: NotificationMessage, options?: ToastOptions): Id {
    return toast(<Notification title={message.title} desctiption={message.desctiption} />, options);
  }

  function closeNotification(id: Id): void {
    toast.dismiss(id);
  }

  function closeAllNotifications(): void {
    toast.dismiss();
  }

  return { notification, closeNotification, closeAllNotifications };
}
