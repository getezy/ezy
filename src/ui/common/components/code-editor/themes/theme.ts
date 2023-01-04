import { HighlightStyle, syntaxHighlighting } from '@codemirror/language';
import { Extension } from '@codemirror/state';
import { EditorView } from '@codemirror/view';
import { tags as t } from '@lezer/highlight';

export interface ThemeColors {
  property: string;
  number: string;
  boolean: string;
  string: string;
  null: string;
}

export function createTheme(colors: ThemeColors, isDark: boolean = false): Extension {
  const theme = EditorView.theme({}, { dark: isDark });

  const highlightStyle = HighlightStyle.define([
    { tag: t.propertyName, color: colors.property },
    { tag: t.number, color: colors.number },
    { tag: t.bool, color: colors.boolean },
    { tag: t.string, color: colors.string },
    { tag: t.null, color: colors.null },
  ]);

  return [theme, syntaxHighlighting(highlightStyle)];
}
