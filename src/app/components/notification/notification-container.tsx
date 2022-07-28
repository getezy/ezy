import { styled } from '@nextui-org/react';
import React from 'react';
import { ToastContainer } from 'react-toastify';

const StyledToastContainer = styled(ToastContainer, {
  position: 'fixed',
  zIndex: '$max',
});

export const NotificationContainer: React.FC = () => <StyledToastContainer />;
