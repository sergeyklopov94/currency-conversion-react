import { makeObservable, observable, action, computed } from "mobx";
import api from '../utils/api';

export function ConverterStore() {

  return makeObservable({
    money: "1000,00",
    sourceCurrency: 'RUB',
    obtainedCurrency: 'USD',
    currencyRelation: "2",
    converseCurrencyRelation: "7",
    currencyList: [],

    get convertedMoney() {
      return this.tryConvert(this.money, this.currencyRelation);
    },
    handleSourceCurrencyChange(e) {
      this.sourceCurrency = e.target.value.split(' ')[0];
      this.recalculateCurrencyChange(this.sourceCurrency, this.obtainedCurrency);
    },
    handleObtainedCurrencyChange(e) {
      this.obtainedCurrency = e.target.value.split(' ')[0];
      this.recalculateCurrencyChange(this.sourceCurrency, this.obtainedCurrency);
    },
    handleMoneyChange(e) {
      this.money = e.target.value;
    },
    tryConvert(money, curRel) {
      const input = parseFloat(money.split(',').join('.'));
      if (Number.isNaN(input)) {
        return '';
      }
      const output = input * curRel;
      return output.toString().split('.').join(',');
    },
    recalculateCurrencyChange(source, obtained) {
      if (source === obtained) {
        this.currencyRelation = '1';
        this.converseCurrencyRelation = '1';
      } else {
        api.getCurrencyRelation(source, obtained)
          .then((currencyRelation) => {
            this.currencyRelation = Object.values(currencyRelation.quotes)[0];
          })
          .catch((err) => {
            console.log(err);
          });

          api.getCurrencyRelation(obtained, source)
          .then((converseCurrencyRelation) => {
            this.converseCurrencyRelation = Object.values(converseCurrencyRelation.quotes)[0];
          })
          .catch((err) => {
            console.log(err);
          });
      }
        this.tryConvert(this.money, this.currencyRelation)
    },
    handleChangeCurrencies() {
      const sCur = this.sourceCurrency;
      const cRel = this.currencyRelation;
      this.sourceCurrency = this.obtainedCurrency;
      this.obtainedCurrency = sCur;
      this.currencyRelation = this.converseCurrencyRelation;
      this.converseCurrencyRelation = cRel;
      this.tryConvert(this.money, this.currencyRelation);
    }
  }, {
    money: observable,
    sourceCurrency: observable,
    obtainedCurrency: observable,
    currencyList:  observable,
    currencyRelation: observable,
    converseCurrencyRelation: observable,
    convertedMoney: computed,
    handleSourceCurrencyChange: action.bound,
    handleObtainedCurrencyChange: action.bound,
    handleMoneyChange: action.bound,
    tryConvert: action.bound,
    recalculateCurrencyChange: action.bound,
    handleChangeCurrencies: action.bound,
  });
}
