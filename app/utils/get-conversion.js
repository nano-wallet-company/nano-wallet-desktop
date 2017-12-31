import BigNumber from 'npm:bignumber.js';

const base10 = BigNumber(10);

const Gxrb = Symbol('Gxrb');
const Mxrb = Symbol('Mxrb');
const kxrb = Symbol('kxrb');
const xrb = Symbol('xrb');
const mxrb = Symbol('mxrb');
const uxrb = Symbol('uxrb');

export const DEFAULT_UNIT = Mxrb;

export const UNITS = {
  Gxrb,
  Mxrb,
  kxrb,
  xrb,
  mxrb,
  uxrb,
};

export const CONVERSION_FACTORS = {
  [Gxrb]: base10.pow(33),
  [Mxrb]: base10.pow(30),
  [kxrb]: base10.pow(27),
  [xrb]: base10.pow(24),
  [mxrb]: base10.pow(21),
  [uxrb]: base10.pow(18),
};

export default function getConversion(unit) {
  return CONVERSION_FACTORS[UNITS[unit]] || CONVERSION_FACTORS[DEFAULT_UNIT];
}
