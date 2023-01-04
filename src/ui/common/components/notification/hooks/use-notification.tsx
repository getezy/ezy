import React from 'react';
import { Id, toast, ToastOptions } from 'react-toastify';

import { Notification } from '../notification';

export type NotificationMessage = {
  title: string;
  description?: string;
};

export function notification(message: NotificationMessage, options?: ToastOptions): Id {
  return toast(<Notification title={message.title} description={message.description} />, options);
}

export function closeNotification(id: Id): void {
  toast.dismiss(id);
}

export function closeAllNotifications(): void {
  toast.dismiss();
}
