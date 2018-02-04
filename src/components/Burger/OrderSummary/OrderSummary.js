import React from 'react';
import Aux from '../../../hoc/Aux_wrapper';
import Button from '../../UI/Button/Button';

const orderSummary = (props) => {

  const ingredientSummary = Object.keys(props.ingredients).map( igKey => {
    return <li key={igKey}>
      <span style={{textTransform: 'capitalize'}}>{igKey}</span>: {props.ingredients[igKey]}
    </li>
  });

  return (
    <Aux>
      <h3>Your Order</h3>
      <p>A delicious burger with the following ingredients:</p>
      <ul>
        {ingredientSummary}
      </ul>
      <p>Total: <strong>{props.price.toFixed(2)}</strong></p>
      <p>Continue to Checkout?</p>
      <Button btnType='Success' clicked={props.continuePurcasing}>Continue</Button>
      <Button btnType='Danger' clicked={props.cancelPurchasing}>Cancel</Button>
    </Aux>
  )
};

export default orderSummary;