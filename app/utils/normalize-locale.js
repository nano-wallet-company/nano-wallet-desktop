export default function normalizeLocale(locale = null) {
  const variant = String(locale).toLowerCase();
  switch (variant) {
    case 'zh-cn':
      return 'zh-hans';
    default:
      return locale;
  }
}
