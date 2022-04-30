import create from 'zustand';

import { ThemeStorage, ThemeType } from './interfaces';

export const useThemeStore = create<ThemeStorage>(() => ({
  type: ThemeType.Dark,
}));
