import { json } from '@codemirror/lang-json';
import { useTheme } from '@nextui-org/react';
// import { oneDark } from '@codemirror/theme-one-dark';
import CodeMirror from '@uiw/react-codemirror';
import React from 'react';

import { createTheme } from './themes/theme';

const value = `
  "number": 123,
  "bool": false,
  "string": "new dasdas",
  "float": 123.123,
`.repeat(10);

export const CodeEditor: React.FC = () => {
  const { theme, isDark } = useTheme();

  return (
    <CodeMirror
      value={`{${value}}`}
      height="auto"
      // 150px from top
      maxHeight="calc(100vh - 150px)"
      theme={createTheme(
        {
          chalky: theme?.colors.gray500.value!,
          coral: theme?.colors.yellow700.value!,
          cyan: theme?.colors.cyan500.value!,
          invalid: theme?.colors.red300.value!,
          ivory: theme?.colors.gray700.value!,
          stone: theme?.colors.gray500.value!,
          malibu: theme?.colors.blue400.value!,
          sage: theme?.colors.success.value!,
          whiskey: theme?.colors.blue700.value!,
          violet: theme?.colors.primary.value!,
          darkBackground: theme?.colors.background.value!,
          highlightBackground: theme?.colors.accents1.value!,
          background: theme?.colors.backgroundContrast.value!,
          tooltipBackground: theme?.colors.backgroundContrast.value!,
          selection: theme?.colors.accents2.value!,
          cursor: theme?.colors.selection.value!,
        },
        theme?.fonts.sans.value!,
        isDark
      )}
      extensions={[json()]}
    />
  );
};
