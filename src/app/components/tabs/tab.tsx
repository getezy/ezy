/* eslint-disable react/no-unused-prop-types */

import { styled, VariantProps } from '@nextui-org/react';
import React, { PropsWithChildren } from 'react';

const StyledTab = styled('div');

export type TabProps = {
  title: string;

  id: string;

  closable?: boolean;
} & VariantProps<typeof StyledTab>;

export const Tab: React.FC<PropsWithChildren<TabProps>> = ({ children }) => (
  <StyledTab>{children}</StyledTab>
);
