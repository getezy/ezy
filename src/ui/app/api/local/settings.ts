import {
  Alignment,
  isAlignmentValue,
  isLanguageValue,
  isMenuOptionsValue,
  isThemeValue,
  Language,
  MenuOptions,
  Setting,
  SettingKey,
  Theme,
} from '@core';

export async function fetchTheme() {
  const row = await window.database.settings.findOneOrFail({ key: SettingKey.THEME });

  if (isThemeValue(row.value)) {
    return new Setting({ key: SettingKey.THEME, value: row.value });
  }

  throw new Error('Error while fetching settings:theme value.');
}

export async function setTheme(theme: Theme) {
  await window.database.settings.upsert({ key: SettingKey.THEME, value: { theme } });
}

export async function fetchAlignment() {
  const row = await window.database.settings.findOneOrFail({ key: SettingKey.ALIGNMENT });

  if (isAlignmentValue(row.value)) {
    return new Setting({ key: SettingKey.ALIGNMENT, value: row.value });
  }

  throw new Error('Error while fetching settings:alignment value.');
}

export async function setAlignment(alignment: Alignment) {
  await window.database.settings.upsert({ key: SettingKey.ALIGNMENT, value: { alignment } });
}

export async function fetchLanguage() {
  const row = await window.database.settings.findOneOrFail({ key: SettingKey.LANGUAGE });

  if (isLanguageValue(row.value)) {
    return new Setting({ key: SettingKey.LANGUAGE, value: row.value });
  }

  throw new Error('Error while fetching settings:language value.');
}

export async function setLanguage(language: Language) {
  await window.database.settings.upsert({ key: SettingKey.LANGUAGE, value: { language } });
}

export async function fetchMenuOptions() {
  const row = await window.database.settings.findOneOrFail({ key: SettingKey.MENU });

  if (isMenuOptionsValue(row.value)) {
    return new Setting({ key: SettingKey.MENU, value: row.value });
  }

  throw new Error('Error while fetching settings:menu value.');
}

export async function setMenu(menu: MenuOptions) {
  await window.database.settings.upsert({ key: SettingKey.MENU, value: menu });
}

export function fetchAllSettings() {
  return Promise.all([
    fetchTheme().then((setting) => setting.value.theme),
    fetchAlignment().then((setting) => setting.value.alignment),
    fetchLanguage().then((setting) => setting.value.language),
    fetchMenuOptions().then((setting) => setting.value),
  ]);
}
