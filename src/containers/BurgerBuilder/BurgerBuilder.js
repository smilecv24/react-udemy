import React, {Component} from 'react';
import Aux from '../../hoc/Aux_wrapper';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

const INGREDIENT_PRICES = {
  salat: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
};

class BurgerBuilder extends Component {

  constructor(props) {
    super(props);
    this.state = {
      ingredients: {
        salat: 1,
        bacon: 1,
        cheese: 2,
        meat: 1
      },
      totalPrice: 4,
    }
  }

  addIngredientHandler(type) {
    const newIngredients = this.state.ingredients;
    newIngredients[type] += 1;

    let newPrice = this.state.totalPrice;
    newPrice += INGREDIENT_PRICES[type];

    this.setState({
      ingredients: newIngredients,
      totalPrice: newPrice
    })
  }

  dropIngredientHandler(type) {
    const newIngredients = this.state.ingredients;
    newIngredients[type] -= 1;

    let newPrice = this.state.totalPrice;
    newPrice -= INGREDIENT_PRICES[type];

    this.setState({
      ingredients: newIngredients,
      totalPrice: newPrice
    })
  }


  render() {
    return (
      <Aux>
        <Burger ingredients={this.state.ingredients}/>
        <BuildControls ingredientAdd={this.addIngredientHandler.bind(this)}
                       ingredientDrop={this.dropIngredientHandler.bind(this)}/>
        {this.state.totalPrice}
      </Aux>
    )
  }
}

export default BurgerBuilder;