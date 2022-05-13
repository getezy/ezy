import { styled } from '@nextui-org/react';
import ReactSelect from 'react-select';

export const StyledSelect = styled(ReactSelect, {
  '.react-select': {},
  '.react-select__control': {
    backgroundColor: '$accents0',
    height: 'calc($$selectHeightRatio * $9)',
    minHeight: 'calc($$selectHeightRatio * $9)',
  },
  '.react-select__placeholder': {
    color: '$accents3',
    fontSize: '$$selectFontSize',
    userSelect: 'none',
  },
  '.react-select__indicators': {
    height: 'calc($$selectHeightRatio * $9)',
    minHeight: 'calc($$selectHeightRatio * $9)',
  },
  '.react-select__value-container': {
    height: 'calc($$selectHeightRatio * $9)',
    minHeight: 'calc($$selectHeightRatio * $9)',
  },
  '.react-select__input-container': {
    color: '$text',
    fontSize: '$$selectFontSize',
    padding: 0,
    margin: 0,
  },
  '.react-select__single-value': {
    color: '$text',
    fontSize: '$$selectFontSize',
    userSelect: 'none',
  },
  '.react-select__menu': {
    backgroundColor: '$accents0',
    fontSize: '$$selectFontSize',
  },
  '.react-select__option': {
    backgroundColor: '$accents0',
  },
  '.react-select__option:hover': {
    backgroundColor: '$accents1',
  },
  '.react-select__option--is-selected': {
    color: '$accents3',
  },

  variants: {
    separator: {
      false: {
        '.react-select__indicator-separator': {
          display: 'none',
        },
      },
    },
    bordered: {
      false: {
        '.react-select__control': {
          border: 'none',
        },
        '.react-select__control:hover': {
          border: 'none',
        },
        '.react-select__control--is-focused': {
          boxShadow: 'none',
        },
      },
    },

    size: {
      xs: {
        $$selectFontSize: '$fontSizes$tiny',
        $$selectHeightRatio: '1.2',
      },
      sm: {
        $$selectFontSize: '$fontSizes$tiny',
        $$selectHeightRatio: '1.6',
      },
      md: {
        $$selectFontSize: '$fontSizes$xs',
        $$selectHeightRatio: '2',
      },
      lg: {
        $$selectFontSize: '$fontSizes$base',
        $$selectHeightRatio: '2.2',
      },
      xl: {
        $$selectFontSize: '$fontSizes$sm',
        $$selectHeightRatio: '2.6',
      },
    },
  },
});
