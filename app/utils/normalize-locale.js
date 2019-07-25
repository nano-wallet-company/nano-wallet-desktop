import baseNormalizeLocale from 'ember-intl/-private/normalize-locale';

export const localeVariants = new Map([['zh-cn', 'zh-hans']]);

export default function normalizeLocale(locale = null) {
  const variant = baseNormalizeLocale(locale) || locale;
  return localeVariants.get(variant) || variant;
}
