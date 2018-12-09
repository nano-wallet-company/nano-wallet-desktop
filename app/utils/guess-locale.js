import locale2 from 'locale2';

export const DEFAULT_LOCALE = 'en-us';

export default function guessLocale() {
  return locale2 || DEFAULT_LOCALE;
}
