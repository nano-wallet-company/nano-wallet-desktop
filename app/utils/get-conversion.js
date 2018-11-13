import { defineError } from 'ember-exex/error';

import BigNumber from 'bignumber.js';

const base10 = BigNumber(10);

const Gxrb = Symbol.for('Gxrb');
const Mxrb = Symbol.for('Mxrb');
const kxrb = Symbol.for('kxrb');
const xrb = Symbol.for('xrb');
const mxrb = Symbol.for('mxrb');
const uxrb = Symbol.for('uxrb');

export const UNITS = new Set([
  Gxrb,
  Mxrb,
  kxrb,
  xrb,
  mxrb,
  uxrb,
]);

export const DEFAULT_UNIT = Mxrb;

export const CONVERSION_FACTORS = new Map([
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
  if (!UNITS.has(unit)) {
    throw new InvalidUnitError({ params: { unit } });
  }

  return CONVERSION_FACTORS.get(unit);
}
