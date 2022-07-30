export function parseErrorFromIPCMain(error: any): string {
  if (error?.message && typeof error.message === 'string') {
    const message = error.message.split('Error: ');

    return message.length > 1 ? message[1] : error.message;
  }

  return error;
}
