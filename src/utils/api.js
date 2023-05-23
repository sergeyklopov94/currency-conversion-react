export class Api {
  constructor(options) {
    this._options = options;
    this._baseUrl = this._options.baseUrl;
    this._headers = this._options.headers;
    this._params = this._options.params;
  }

  _checkResponse(res) {
    if (res.ok)
      return res.json();
    return Promise.reject(`Код ошибки: ${res.status}`);
  }

  async getCurrencyData() {
    const res = await fetch(this._baseUrl + '/list', {
      headers: this._headers
    });
    return this._checkResponse(res);
  }

  async getCurrencyRelation(sourceCurrency, obtainedCurrency) {
    const res = await fetch(this._baseUrl + '/live?' + new URLSearchParams({
      source: sourceCurrency,
      currencies: obtainedCurrency,
    }),
    {
      headers: this._headers,
    });
    return this._checkResponse(res);
  }
}

const api = new Api({
  baseUrl: 'https://api.apilayer.com/currency_data',
  headers: {
    apikey: 'O5NiXQNj2bwviWNp0rMxstOCifoaxchC',
  }
});

export default api;
