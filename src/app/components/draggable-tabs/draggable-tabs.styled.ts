import { styled } from '@nextui-org/react';
import ReactTabs from 'rc-tabs';

export const StyledDraggableTabs = styled(ReactTabs, {
  $$navListBorder: '1px',
  $$tabsHeight: '35px',

  '.rc-tabs': {
    bottom: 0,
  },
  '.rc-tabs-nav': {},
  '.rc-tabs-nav-wrap': {},
  '.rc-tabs-nav-operations': {
    display: 'none',
  },
  '.rc-tabs-nav-list': {
    display: 'flex',
    overflowY: 'hidden',
    overflowX: 'auto',
    transition: 'transform 0.3s',
    height: '$$tabsHeight',
    borderBottom: 'solid $accents1 $$navListBorder',
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  },
  '.rc-tabs-content': {
    height: 'calc(100vh - $$tabsHeight - $$navListBorder)',
  },
  '.rc-tabs-tabpane': {
    height: 'calc(100vh - $$tabsHeight - $$navListBorder)',
  },
  '.rc-tabs-tab': {
    display: 'flex',
    alignItems: 'center',
    height: '$$tabsHeight',
    minWidth: 'max-content',
    cursor: 'pointer',
    userSelect: 'none',
    background: '$accents0',
  },
  '.rc-tabs-tab-active': {
    fontWeight: 'bolder',
    background: '$accents1',
  },
  '.rc-tabs-tab-btn': {
    font: 'inherit',
    border: 0,
    paddingLeft: 10,
    paddingRight: 10,
  },
  '.rc-tabs-tab-remove': {
    border: 0,
    background: 'transparent',
  },
  '.rc-tabs-tab-remove:hover': {
    color: '$accents4',
  },
  '.rc-tabs-nav-add': {
    visibility: 'visible !important',
    border: 0,
    background: '$accents0',
    marginLeft: 10,
    fontSize: 12,
  },
  '.rc-tabs-nav-add:hover > svg': {
    border: 0,
    color: '$accents4',
  },
  '.rc-tabs-ink-bar': {
    height: 3,
    bottom: 0,
    background: '$primary',
    position: 'absolute',
    pointerEvents: 'none',
  },
  '.rc-tabs-ink-bar-animated': {
    transition: 'all 0.3s',
  },
});
