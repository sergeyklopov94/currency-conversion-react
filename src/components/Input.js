import React from 'react';
import { IMaskInput } from 'react-imask';

function Input (props) {

  const configBlocks = {
    number: {
      mask: Number,
      radix: ",",
      scale: 2,
      //thousandsSeparator: " ",
      normalizeZeros: false,
      value: ""
    }
  }

  return (
    <IMaskInput
        blocks = {configBlocks}
        mask = "number"
        className="converter__field"
        onAccept = {
          (value, mask) => console.log(value)
        }
        placeholder = "Введите значение..."
        unmask={true}
        value={ props.money }
        onChange={ props.handleMoneyChange }
      />
    );
};

export default Input;

