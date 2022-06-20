import { json } from '@codemirror/lang-json';
import { ViewUpdate } from '@codemirror/view';
import { useTheme } from '@nextui-org/react';
import React from 'react';

import { StyledCodeMirror } from './code-editor.styled';
import { createTheme } from './themes/theme';

export interface CodeEditorProps {
  value?: string;

  maxHeight?: string;

  maxWidth?: string;

  onChange?(value: string, viewUpdate?: ViewUpdate): void;
}

export const CodeEditor: React.FC<CodeEditorProps> = ({
  maxHeight,
  maxWidth,
  value,
  onChange = () => {},
}) => {
  const { theme, isDark } = useTheme();

  return (
    <StyledCodeMirror
      value={value}
      height="auto"
      width="auto"
      maxWidth={maxWidth}
      maxHeight={maxHeight}
      onChange={onChange}
      basicSetup={{
        searchKeymap: false,
      }}
      theme={createTheme(
        {
          property: theme?.colors.green800.value!,
          number: theme?.colors.yellow800.value!,
          boolean: theme?.colors.pink800.value!,
          string: theme?.colors.purple800.value!,
          null: theme?.colors.blue800.value!,
        },
        isDark
      )}
      extensions={[json()]}
    />
  );
};
