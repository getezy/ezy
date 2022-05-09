import { styled } from '@nextui-org/react';
import ReactTabs from 'rc-tabs';

// @ts-ignore
export const StyledDraggableTabs = styled(ReactTabs, {
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
    overflow: 'auto',
    transition: 'transform 0.3s',
    borderBottom: 'solid $accents2 1px',
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  },
  '.rc-tabs-content': {
    paddingTop: 20,
  },
  '.rc-tabs-tab': {
    display: 'flex',
    alignItems: 'center',
    height: 40,
    minWidth: 'max-content',
    cursor: 'pointer',
    userSelect: 'none',
    background: '$accents1',
  },
  '.rc-tabs-tab-active': {
    fontWeight: 'bolder',
    background: '$accents2',
  },
  '.rc-tabs-tab-btn': {
    font: 'inherit',
    border: 0,
    paddingLeft: 10,
    paddingRight: 5,
  },
  '.rc-tabs-tab-remove': {
    border: 0,
    background: 'transparent',
  },
  '.rc-tabs-tab-remove:hover': {
    color: '$accents5',
  },
  '.rc-tabs-nav-add': {
    visibility: 'visible !important',
    border: 0,
    background: '$accents1',
    marginLeft: 10,
    fontSize: 12,
  },
  '.rc-tabs-nav-add:hover > svg': {
    border: 0,
    color: '$accents5',
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
