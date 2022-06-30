import { styled } from '@nextui-org/react';
import CodeMirror from '@uiw/react-codemirror';

export const StyledCodeMirror = styled(CodeMirror, {
  '&': {
    color: '$text',
    backgroundColor: '$backgroundContrast',
  },

  '.cm-content': {
    padding: 0,
    caretColor: '$selection',
    fontFamily: '$mono',
    fontSize: '$fontSizes$sm',
  },

  '.cm-cursor, .cm-dropCursor': {
    borderLeftColor: '$text',
  },

  '&.cm-focused .cm-selectionBackground, .cm-selectionBackground, .cm-content ::selection': {
    backgroundColor: 'inherit',
  },

  '.cm-searchMatch': {
    backgroundColor: '$accents2',
  },

  '.cm-selectionMatch': {
    backgroundColor: '$accents4',
  },

  '.cm-activeLine': {
    backgroundColor: '$accents1',
  },

  '.cm-gutters': {
    backgroundColor: '$backgroundContrast',
    color: '$accents8',
    border: 'none',
    userSelect: 'none',
    fontFamily: '$mono',
    fontSize: '$fontSizes$sm',
  },

  '.cm-activeLineGutter': {
    backgroundColor: '$accents1',
  },

  '.cm-foldPlaceholder': {
    backgroundColor: 'transparent',
    border: 'none',
    color: '$yellow500',
  },
});
