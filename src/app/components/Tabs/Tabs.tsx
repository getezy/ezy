import { styled } from '@nextui-org/react';
import { Tabs as AntdTabs } from 'antd';
import React from 'react';

const { TabPane: AntdTabPane } = AntdTabs;

// @ts-ignore
const StyledTabs = styled(AntdTabs, {
  '.ant-tabs-nav-list': {
    display: 'flex',
    flexWrap: 'nowrap',
    paddingTop: 5,
    paddingLeft: 5,

    overflow: 'auto',
    borderBottom: 'solid $accents2 1px',

    '&::-webkit-scrollbar': {
      display: 'none',
    },
  },

  '.ant-tabs-tab': {
    paddingLeft: 10,
    paddingRight: 10,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    userSelect: 'none',
    background: '$accents1',
    '&:focus': {
      outline: 'none',
    },
  },

  '.ant-tabs-tab-active': {
    background: '$accents2',
    borderBottom: 'solid $primary 2px',
  },
});

const StyledTabPane = styled(AntdTabPane);

export interface Tab {
  id: string;

  title: string;

  content: React.ReactNode;
}

export interface TabsProps {
  tabs: Tab[];

  activeKey?: string;

  onChange?: (activeKey: string) => void;
}

export const Tabs: React.FC<TabsProps> = ({ tabs, activeKey, onChange }) => (
  <StyledTabs activeKey={activeKey} onChange={onChange}>
    {tabs.map((tab) => (
      <StyledTabPane key={tab.id} tab={tab.title}>
        {tab.content}
      </StyledTabPane>
    ))}
  </StyledTabs>
);
