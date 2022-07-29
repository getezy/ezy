import { styled, useTheme } from '@nextui-org/react';
import React from 'react';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

const StyledToastContainer = styled(ToastContainer, {
  position: 'fixed',
  zIndex: '$max',
});

export const NotificationContainer: React.FC = () => {
  const theme = useTheme();

  return (
    <StyledToastContainer
      position="bottom-right"
      autoClose={false}
      // autoClose={3000}
      newestOnTop
      pauseOnFocusLoss
      pauseOnHover
      theme={theme.isDark ? 'dark' : 'light'}
    />
  );
};
