import { styled } from '@nextui-org/react';
import CodeMirror from '@uiw/react-codemirror';

export const StyledCodeMirror = styled(CodeMirror, {
  '&': {
    color: '$text',
    backgroundColor: '$background',
    width: '100%',
  },

  '.cm-content': {
    padding: 0,
    fontFamily: '$mono',
    fontSize: '$fontSizes$xs',
  },

  '.cm-editor.cm-focused': {
    outline: 'none',
  },

  '.cm-cursor, .cm-dropCursor': {
    borderLeftColor: '$text',
  },

  '.cm-focused .cm-selectionBackground, .cm-selectionBackground': {
    backgroundColor: '$selection',
  },

  '.cm-activeLine': {
    backgroundColor: '$activeLine',
  },

  '.cm-selectionMatch': {
    backgroundColor: '$green200',
  },

  '.cm-line': {
    padding: '0 0 0 4px',
  },

  '.cm-gutters': {
    backgroundColor: '$background',
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
