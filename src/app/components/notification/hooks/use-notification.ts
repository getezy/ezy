import { Id, toast, ToastOptions } from 'react-toastify';

export function useNotification() {
  function notification(text: string, options?: ToastOptions): Id {
    return toast(text, options);
  }

  function closeNotification(id: Id): void {
    toast.dismiss(id);
  }

  function closeAllNotifications(): void {
    toast.dismiss();
  }

  return { notification, closeNotification, closeAllNotifications };
}
