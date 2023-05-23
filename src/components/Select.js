function Select(props) {

  const currentValues = {
    RUB: 'Russian Ruble',
    USD: 'United States Dollar',
    EUR: 'Euro',
  }

  const currencies = props.options.currencies === undefined ? currentValues : props.options.currencies;

  const options = Object.entries(currencies).map(([optionKey, optionValue]) => {
      return <option key={`${optionKey}`} selected={optionKey === props.selectedCurrency}>{`${optionKey} ${optionValue}`}</option>;
  });

  return (
    <select className="converter__selector" onChange={props.onEnterCurrency}>
      {options}
    </select>
  );
};

export default Select;
