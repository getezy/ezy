import { defaultKeymap, indentWithTab } from '@codemirror/commands';
import { json } from '@codemirror/lang-json';
// import { json, jsonParseLinter } from '@codemirror/lang-json';
// import { linter, lintGutter } from '@codemirror/lint';
import { keymap, ViewUpdate } from '@codemirror/view';
import { useTheme } from '@nextui-org/react';
import { BasicSetupOptions } from '@uiw/react-codemirror';
import React from 'react';

import { StyledCodeMirror } from './code-editor.styled';
import { createTheme } from './themes/theme';

export interface CodeEditorProps {
  value?: string;

  height?: string;

  width?: string;

  maxHeight?: string;

  maxWidth?: string;

  readOnly?: boolean;

  basicSetup?: BasicSetupOptions;

  onChange?(value: string, viewUpdate?: ViewUpdate): void;
}

export const CodeEditor: React.FC<CodeEditorProps> = ({
  maxHeight,
  maxWidth,
  height = 'auto',
  width = 'auto',
  value,
  readOnly = false,
  basicSetup,
  onChange = () => {},
}) => {
  const { theme, isDark } = useTheme();

  return (
    <StyledCodeMirror
      value={value}
      height={height}
      width={width}
      maxWidth={maxWidth}
      maxHeight={maxHeight}
      readOnly={readOnly}
      indentWithTab={false}
      onChange={onChange}
      basicSetup={{
        searchKeymap: false,
        defaultKeymap: false,
        ...basicSetup,
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
      extensions={[
        keymap.of([
          indentWithTab,
          // https://github.com/uiwjs/react-codemirror/issues/356
          ...defaultKeymap.filter((shortcut) => shortcut.key !== 'Mod-Enter'),
        ]),
        json(),
      ]}
      // extensions={[keymap.of([indentWithTab]), json()]}
      // extensions={[keymap.of([indentWithTab]), json(), linter(jsonParseLinter()), lintGutter()]}
    />
  );
};
