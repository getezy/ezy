import { isThemeValue, SettingsKey, Theme } from '@database/types';

export async function fetchTheme() {
  const row = await window.database.settings.findOne({ key: SettingsKey.THEME });

  if (row && isThemeValue(row.value)) {
    return row.value.theme;
  }

  return null;
}

export async function setTheme(theme: Theme) {
  await window.database.settings.upsert({ key: SettingsKey.THEME, value: { theme } });
}

// export async function fetchAlighment() {
//   const alignment = await window.database.settings.findOne({ key: 'alignment' });

//   if (alignment) {
//     return alignment.value;
//   }

//   return null;
// }
