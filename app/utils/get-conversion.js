import { defineError } from 'ember-exex/error';

import BigNumber from 'bignumber.js';

const base10 = BigNumber(10);

export const Gxrb = 'Gxrb';
export const Mxrb = 'Mxrb';
export const kxrb = 'kxrb';
export const xrb = 'xrb';
export const mxrb = 'mxrb';
export const uxrb = 'uxrb';

export const DEFAULT_UNIT = Mxrb;

export const units = new Set([Gxrb, Mxrb, kxrb, xrb, mxrb, uxrb]);

export const conversionFactors = new Map([
  [Gxrb, base10.pow(33)],
  [Mxrb, base10.pow(30)],
  [kxrb, base10.pow(27)],
  [xrb, base10.pow(24)],
  [mxrb, base10.pow(21)],
  [uxrb, base10.pow(18)],
]);

export const InvalidUnitError = defineError({
  name: 'InvalidUnitError',
  message: 'Invalid unit: {unit}',
  extends: TypeError,
});

export default function getConversion(unit = DEFAULT_UNIT) {
  if (!units.has(unit)) {
    throw new InvalidUnitError({ params: { unit } });
  }

  return conversionFactors.get(unit);
}
