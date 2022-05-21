import { json } from '@codemirror/lang-json';
import { oneDark } from '@codemirror/theme-one-dark';
import CodeMirror from '@uiw/react-codemirror';
import React from 'react';

export const CodeEditor: React.FC = () => (
  <CodeMirror
    value="console.log('hello world!');"
    height="auto"
    // 150px from top
    maxHeight="calc(100vh - 150px)"
    theme={oneDark}
    extensions={[json()]}
  />
);
