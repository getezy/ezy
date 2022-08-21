import { styled } from '@nextui-org/react';
import { KBarAnimator, KBarPositioner, KBarSearch } from 'kbar';

export const StyledKBarPositioner = styled(KBarPositioner, {
  zIndex: '$max',
});

export const StyledKBarAnimator = styled(KBarAnimator, {
  maxWidth: '600px',
  width: '100%',
  background: '$backgroundContrast',
  color: '$text',
  borderRadius: '8px',
  overflow: 'hidden',
  boxShadow: '$xl',
});

export const StyledKBarSearch = styled(KBarSearch, {
  padding: '12px 16px',
  fontFamily: '$sans',
  fontSize: '16px',
  width: '100%',
  boxSizing: 'border-box',
  outline: 'none',
  border: 'none',
  background: '$backgroundContrast',
  color: '$text',
});

export const StyledGroupName = styled('div', {
  padding: '8px 16px',
  fontSize: '10px',
  textTransform: 'uppercase',
  opacity: 0.5,
});

export const StyledResultItem = styled('div', {
  padding: '12px 16px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  cursor: 'pointer',

  variants: {
    active: {
      true: {
        backgroundColor: '$accents1',
        borderLeft: '2px solid $foreground',
      },
      false: {
        backgroundColor: 'transparent',
        borderLeft: '2px solid transparent',
      },
    },
  },
});

export const StyledActionWrapper = styled('div', {
  display: 'flex',
  gap: '8px',
  alignItems: 'center',
  fontSize: 14,
});

export const StyledShortcutWrapper = styled('div', {
  display: 'grid',
  gridAutoFlow: 'column',
  gap: '1px',
});

export const StyledKbd = styled('kbd', {
  padding: '4px 6px',
  background: 'rgba(0 0 0 / .1)',
  borderRadius: '4px',
  fontSize: 14,
  margin: 0,
});
