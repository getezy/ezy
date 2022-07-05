import { VariantProps } from '@nextui-org/react';
import React from 'react';

import { StyledLogs } from './logs-bar.styled';

export type LogsBarProps = VariantProps<typeof StyledLogs>;

export const LogsBar: React.FC<LogsBarProps> = ({ hasNewLogs = false }) => (
  <StyledLogs hasNewLogs={hasNewLogs} />
);
