export const supportedFiatCurrencies = [
  {
    code: 'AUD',
    name: 'Australian dollar',
    symbol: '$',
  }, {
    code: 'BRL',
    name: 'Brazilian real',
    symbol: 'R$',
  }, {
    code: 'CAD',
    name: 'Canadian dollar',
    symbol: '$',
  }, {
    code: 'CHF',
    name: 'Swiss franc',
    symbol: 'Fr.',
  }, {
    code: 'CLP',
    name: 'Chilean peso',
    symbol: '$',
    decimals: '0',
  }, {
    code: 'CNY',
    name: 'Chinese yuan',
    symbol: '元',
  }, {
    code: 'CZK',
    name: 'Czech koruna',
    symbol: 'Kč',
  }, {
    code: 'DKK',
    name: 'Danish krone',
    symbol: 'kr.',
  }, {
    code: 'EUR',
    name: 'Euro',
    symbol: '€',
  }, {
    code: 'GBP',
    name: 'Pound sterling',
    symbol: '£',
  }, {
    code: 'HKD',
    name: 'Hong Kong dollar',
    symbol: 'HK$',
  }, {
    code: 'HUF',
    name: 'Hungarian forint',
    symbol: 'Ft',
  }, {
    code: 'IDR',
    name: 'Indonesian rupiah',
    symbol: 'Rp',
  }, {
    code: 'ILS',
    name: 'Israeli new shekel',
    symbol: '₪',
  }, {
    code: 'INR',
    name: 'Indian rupee',
    symbol: '₹',
  }, {
    code: 'JPY',
    name: 'Japanese yen',
    symbol: '¥',
    decimals: '0',
  }, {
    code: 'KRW',
    name: 'South Korean won',
    symbol: '₩',
    decimals: '0',
  }, {
    code: 'MXN',
    name: 'Mexican peso',
    symbol: '$',
  }, {
    code: 'MYR',
    name: 'Malaysian ringgit',
    symbol: 'RM',
  }, {
    code: 'NOK',
    name: 'Norwegian krone',
    symbol: 'kr',
  }, {
    code: 'NZD',
    name: 'New Zealand dollar',
    symbol: '$',
  }, {
    code: 'PHP',
    name: 'Philippine piso',
    symbol: '₱',
  }, {
    code: 'PKR',
    name: 'Pakistani rupee',
    symbol: 'Rs',
  }, {
    code: 'PLN',
    name: 'Polish złoty',
    symbol: 'zł',
  }, {
    code: 'RUB',
    name: 'Russian ruble',
    symbol: '₽',
  }, {
    code: 'SEK',
    name: 'Swedish krona',
    symbol: 'kr',
  }, {
    code: 'SGB',
    name: 'Singapore dollar',
    symbol: 'S$',
  }, {
    code: 'THB',
    name: 'Thai baht',
    symbol: '฿',
  }, {
    code: 'TRY',
    name: 'Turkish lira',
    symbol: '₺',
  }, {
    code: 'TWD',
    name: 'New Taiwan dollar',
    symbol: 'NT$',
  }, {
    code: 'USD',
    name: 'United States dollar',
    symbol: '$',
  }, {
    code: 'ZAR',
    name: 'South African rand',
    symbol: 'R',
  },
];


export const supportedCryptoCurrencies = [
  { code: 'BTC', name: 'Bitcoin' },
  { code: 'LTC', name: 'Litecoin' },
  { code: 'BCH', name: 'Bitcoin Cash' },
  { code: 'ETH', name: 'Ethereum' },
];


function returnCurrenciesAsSymbol(type) {
  const currencies = [];
  for (let i = 0; i < type.length; i += 1) {
    currencies.push(Symbol.for(type[i].code));
  }
  return currencies;
}

export const fiatCurrencies = returnCurrenciesAsSymbol(supportedFiatCurrencies);
export const cryptoCurrencies = returnCurrenciesAsSymbol(supportedCryptoCurrencies);
