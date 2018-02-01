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
    {controls.map(ctrl => (
      <BuildControl key={ctrl.label} label={ctrl.label}
                    ingredientAdd={() => props.ingredientAdd(ctrl.type)}
                    ingredientDrop={() => props.ingredientDrop(ctrl.type)}/>
    ))}
  </div>
);

export default buildControls;