import React from 'react';
import BuildControl from './BuildControl/BuildControl';
import classes from './BuildControls.css';

const controls = [
  {label: 'Salat', type: 'salat'},
  {label: 'Cheese', type: 'cheese'},
  {label: 'Meat', type: 'meat'},
  {label: 'Bacon', type: 'bacon'},
];

const buildControls = (props) => (
  <div className={classes.BuildControls}>
    <p>Current price: <strong>{props.price.toFixed(2)}</strong></p>
    {controls.map(ctrl => (
      <BuildControl key={ctrl.label} label={ctrl.label}
                    ingredientAdd={() => props.ingredientAdd(ctrl.type)}
                    ingredientDrop={() => props.ingredientDrop(ctrl.type)}
                    disabled={props.disabled[ctrl.type]}/>
    ))}
    <button className={classes.OrderButton}
            onClick={() => props.purchasing()}
            disabled={!props.purchasable}>{props.isAuth ? 'ORDER NOW' : 'Sign Up To Order'}</button>
  </div>
);

export default buildControls;