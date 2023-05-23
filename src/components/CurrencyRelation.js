function CurrencyRelation(props) {

  return (
    <p className="converter__info" >1 {props.sourceCurrency} = {props.currencyRelation} {props.obtainedCurrency}</p>
  );
};

export default CurrencyRelation;
