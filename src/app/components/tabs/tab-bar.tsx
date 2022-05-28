import { CSS, styled } from '@nextui-org/react';
import React, { PropsWithChildren } from 'react';

import { Tab } from './tab';

export interface TabBarProps {}

const StyledTabBar = styled('div', {
  display: 'flex',
  borderBottom: 'solid 1px $accents1',
});

const ActiveBar = styled('div', {
  position: 'absolute',
  height: 4,
  width: 64,
  pointerEvents: 'none',
  transition: 'all 0.3s',

  variants: {
    color: {
      primary: {
        background: '$primary',
      },
      secondary: {
        background: '$secondary',
      },
      success: {
        background: '$success',
      },
      warning: {
        background: '$warning',
      },
      error: {
        background: '$error',
      },
    },
  },
});

export const TabBar: React.FC<PropsWithChildren<TabBarProps>> = ({ children }) => {
  const [activeTab, setActiveTab] = React.useState<number>(0);

  const tabs = React.Children.toArray(children);

  const [activeBarStyles, setActiveBarStyles] = React.useState<CSS>({});

  React.useEffect(() => {
    setActiveBarStyles({ left: 250 + activeTab * 64 });
  }, [activeTab]);

  const handleClick = (index: number) => {
    setActiveTab(index);
  };

  return (
    <StyledTabBar>
      {tabs.map((tab, index) => (
        <Tab active={index === activeTab} onClick={() => handleClick(index)}>
          {tab}
        </Tab>
      ))}
      <ActiveBar css={activeBarStyles} color="primary" />
    </StyledTabBar>
  );
};
