import baseNormalizeLocale from 'ember-intl/-private/normalize-locale';

export const LOCALE_VARIANTS = {
  'zh-cn': 'zh-hans',
};

export default function normalizeLocale(locale = null) {
  const variant = baseNormalizeLocale(locale) || locale;
  return LOCALE_VARIANTS[variant] || variant;
}
