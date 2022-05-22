import { HighlightStyle, syntaxHighlighting } from '@codemirror/language';
import { Extension } from '@codemirror/state';
import { EditorView } from '@codemirror/view';
import { tags as t } from '@lezer/highlight';

export interface ThemeColors {
  chalky: string;
  coral: string;
  cyan: string;
  invalid: string;
  ivory: string;
  stone: string;
  malibu: string;
  sage: string;
  whiskey: string;
  violet: string;
  darkBackground: string;
  highlightBackground: string;
  background: string;
  tooltipBackground: string;
  selection: string;
  cursor: string;
}

export function createTheme(colors: ThemeColors, font: string, isDark: boolean = false): Extension {
  const theme = EditorView.theme(
    {
      '&': {
        color: colors.ivory,
        backgroundColor: colors.background,
      },

      '.cm-content': {
        caretColor: colors.cursor,
        fontFamily: font,
      },

      '.cm-cursor, .cm-dropCursor': { borderLeftColor: colors.cursor },
      '&.cm-focused .cm-selectionBackground, .cm-selectionBackground, .cm-content ::selection': {
        backgroundColor: colors.selection,
      },

      '.cm-panels': { backgroundColor: colors.darkBackground, color: colors.ivory },
      '.cm-panels.cm-panels-top': { borderBottom: '2px solid black' },
      '.cm-panels.cm-panels-bottom': { borderTop: '2px solid black' },

      '.cm-searchMatch': {
        backgroundColor: '#72a1ff59',
        outline: '1px solid #457dff',
      },
      '.cm-searchMatch.cm-searchMatch-selected': {
        backgroundColor: '#6199ff2f',
      },

      '.cm-activeLine': { backgroundColor: colors.highlightBackground },
      '.cm-selectionMatch': { backgroundColor: '#aafe661a' },

      '&.cm-focused .cm-matchingBracket, &.cm-focused .cm-nonmatchingBracket': {
        backgroundColor: '#bad0f847',
        outline: '1px solid #515a6b',
      },

      '.cm-gutters': {
        backgroundColor: colors.background,
        color: colors.stone,
        border: 'none',
      },

      '.cm-activeLineGutter': {
        backgroundColor: colors.highlightBackground,
      },

      '.cm-foldPlaceholder': {
        backgroundColor: 'transparent',
        border: 'none',
        color: '#ddd',
      },

      '.cm-tooltip': {
        border: 'none',
        backgroundColor: colors.tooltipBackground,
      },
      '.cm-tooltip .cm-tooltip-arrow:before': {
        borderTopColor: 'transparent',
        borderBottomColor: 'transparent',
      },
      '.cm-tooltip .cm-tooltip-arrow:after': {
        borderTopColor: colors.tooltipBackground,
        borderBottomColor: colors.tooltipBackground,
      },
      '.cm-tooltip-autocomplete': {
        '& > ul > li[aria-selected]': {
          backgroundColor: colors.highlightBackground,
          color: colors.ivory,
        },
      },
    },
    { dark: isDark }
  );

  const highlightStyle = HighlightStyle.define([
    { tag: t.keyword, color: colors.violet },
    { tag: [t.name, t.deleted, t.character, t.propertyName, t.macroName], color: colors.coral },
    { tag: [t.function(t.variableName), t.labelName], color: colors.malibu },
    { tag: [t.color, t.constant(t.name), t.standard(t.name)], color: colors.whiskey },
    { tag: [t.definition(t.name), t.separator], color: colors.ivory },
    {
      tag: [
        t.typeName,
        t.className,
        t.number,
        t.changed,
        t.annotation,
        t.modifier,
        t.self,
        t.namespace,
      ],
      color: colors.chalky,
    },
    {
      tag: [t.operator, t.operatorKeyword, t.url, t.escape, t.regexp, t.link, t.special(t.string)],
      color: colors.cyan,
    },
    { tag: [t.meta, t.comment], color: colors.stone },
    { tag: t.strong, fontWeight: 'bold' },
    { tag: t.emphasis, fontStyle: 'italic' },
    { tag: t.strikethrough, textDecoration: 'line-through' },
    { tag: t.link, color: colors.stone, textDecoration: 'underline' },
    { tag: t.heading, fontWeight: 'bold', color: colors.coral },
    { tag: [t.atom, t.bool, t.special(t.variableName)], color: colors.whiskey },
    {
      tag: [t.processingInstruction, t.string, t.inserted],
      color: colors.sage,
    },
    { tag: t.invalid, color: colors.invalid },
  ]);

  return [theme, syntaxHighlighting(highlightStyle)];
}
