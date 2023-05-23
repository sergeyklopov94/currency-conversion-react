function CurrencyRelation(props) {

  return (
    <p className="converter__info" onChange={ props.qwerty }>1 {props.sourceCurrency} = {props.currencyRelation} {props.obtainedCurrency}</p>
  );
};

export default CurrencyRelation;
