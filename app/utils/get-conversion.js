import { defineError } from 'ember-exex/error';

import BigNumber from 'npm:bignumber.js';

const base10 = BigNumber(10);

const Gxrb = Symbol.for('Gxrb');
const Mxrb = Symbol.for('Mxrb');
const kxrb = Symbol.for('kxrb');
const xrb = Symbol.for('xrb');
const mxrb = Symbol.for('mxrb');

export const UNITS = new Set([
  Gxrb,
  Mxrb,
  kxrb,
  xrb,
  mxrb,
]);

export const DEFAULT_UNIT = Mxrb;

export const CONVERSION_FACTORS = new Map([
  [Gxrb, base10.pow(13)],
  [Mxrb, base10.pow(10)],
  [kxrb, base10.pow(7)],
  [xrb, base10.pow(4)],
  [mxrb, base10.pow(11)],
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
