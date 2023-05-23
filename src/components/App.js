import React from 'react';
import api from '../utils/api';
import Input from './Input';
import Select from './Select';
import CurrencyRelation from './CurrencyRelation';
import arrowLeft from '../images/Arrow-1.svg';
import arrowRight from '../images/Arrow-2.svg';
import * as ConverterStore from '../stores/ConverterStore';
import { observer } from "mobx-react";

const converterStore = ConverterStore.ConverterStore();

const App = observer(props => {

  React.useEffect(() => {
    api.getCurrencyData()
      .then((currencyData) => {
        converterStore.currencyList = currencyData;
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  React.useEffect(() => {
    Promise.all(
      [api.getCurrencyRelation(converterStore.sourceCurrency, converterStore.obtainedCurrency),
       api.getCurrencyRelation(converterStore.obtainedCurrency, converterStore.sourceCurrency)])
      .then(([currencyRelation, converseCurrencyRelation]) => {
        converterStore.currencyRelation = Object.values(currencyRelation.quotes)[0];
        converterStore.converseCurrencyRelation = Object.values(converseCurrencyRelation.quotes)[0];
        console.log("currencyRelation" + converterStore.currencyRelation);
        console.log("converseCurrencyRelation" + converterStore.converseCurrencyRelation);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="root" id="root">
      <main className="content">
        <ul className="converter-container">
          <li className="converter">
            <h2 className="converter__header">У меня есть</h2>
            <div className="converter__box">
              <Select
                options = { converterStore.currencyList }
                selectedCurrency = { converterStore.sourceCurrency }
                onEnterCurrency = { converterStore.handleSourceCurrencyChange }
              />
              <Input
                money = { converterStore.money }
                handleMoneyChange = { converterStore.handleMoneyChange }
              />
              <CurrencyRelation
                sourceCurrency = { converterStore.sourceCurrency }
                obtainedCurrency = { converterStore.obtainedCurrency }
                currencyRelation = { converterStore.currencyRelation }
              />
            </div>
          </li>
          <button className="exchange-button" onClick={converterStore.handleChangeCurrencies}>
            <img className="exchange-button__image" src={arrowLeft} alt="Стрелка налево"/>
            <img className="exchange-button__image" src={arrowRight} alt="Стрелка направо"/>
          </button>
          <li className="converter">
            <h2 className="converter__header">Я получу</h2>
            <div className="converter__box">
              <Select
                options = { converterStore.currencyList }
                selectedCurrency = { converterStore.obtainedCurrency }
                onEnterCurrency = { converterStore.handleObtainedCurrencyChange }
              />
              <Input
                money = {converterStore.convertedMoney}
              />
              <CurrencyRelation
                sourceCurrency = { converterStore.obtainedCurrency }
                obtainedCurrency = { converterStore.sourceCurrency }
                currencyRelation = { converterStore.converseCurrencyRelation }
                qwerty = { converterStore.handleSourceCurrencyChange }
              />
            </div>
          </li>
        </ul>
      </main>
    </div>
  );
}
);

 export default App;
