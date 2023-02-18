import { Alignment, Language, Setting, SettingKey, Theme } from '../settings';

describe('Setting', () => {
  it('should create new alignment setting', () => {
    const setting = new Setting({
      key: SettingKey.ALIGNMENT,
      value: Alignment.HORIZONTAL,
    });

    expect(setting.value).toStrictEqual(Alignment.HORIZONTAL);
  });

  it('should create new theme setting', () => {
    const setting = new Setting({ key: SettingKey.THEME, value: Theme.DARK });

    expect(setting.value).toStrictEqual(Theme.DARK);
  });

  it('should create new language setting', () => {
    const setting = new Setting({ key: SettingKey.LANGUAGE, value: Language.EN });

    expect(setting.value).toStrictEqual(Language.EN);
  });

  it('should create new menu setting', () => {
    const setting = new Setting({ key: SettingKey.MENU, value: { collapsed: true } });

    expect(setting.value).toStrictEqual({ collapsed: true });
  });
});
