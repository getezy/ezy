import { Alignment, Language, Setting, SettingKey, Theme } from '../settings';

describe('Setting', () => {
  it('should create new alignment setting', () => {
    const setting = new Setting({
      key: SettingKey.ALIGNMENT,
      value: { alignment: Alignment.HORIZONTAL },
    });

    expect(setting.value).toStrictEqual({ alignment: Alignment.HORIZONTAL });
  });

  it('should create new theme setting', () => {
    const setting = new Setting({ key: SettingKey.THEME, value: { theme: Theme.DARK } });

    expect(setting.value).toStrictEqual({ theme: Theme.DARK });
  });

  it('should create new language setting', () => {
    const setting = new Setting({ key: SettingKey.LANGUAGE, value: { language: Language.EN } });

    expect(setting.value).toStrictEqual({ language: Language.EN });
  });

  it('should create new menu setting', () => {
    const setting = new Setting({ key: SettingKey.MENU, value: { collapsed: true } });

    expect(setting.value).toStrictEqual({ collapsed: true });
  });
});
