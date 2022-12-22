import { IAlignmentValue, ILanguageValue, IMenuValue, IThemeValue } from './settings.interface';

export function isAlignmentValue(value: any): value is IAlignmentValue {
  return value?.alignment !== undefined;
}

export function isLanguageValue(value: any): value is ILanguageValue {
  return value?.language !== undefined;
}

export function isMenuValue(value: any): value is IMenuValue {
  return value?.collapsed !== undefined;
}

export function isThemeValue(value: any): value is IThemeValue {
  return value?.theme !== undefined;
}
