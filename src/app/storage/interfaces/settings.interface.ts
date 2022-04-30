import { Language } from './language.interface';
import { ThemeType } from './theme.interface';

export interface SettingsStorage {
  type: ThemeType;
  language: Language;
}
