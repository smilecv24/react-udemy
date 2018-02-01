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

  state = {
    ingredients: {
      salat: 1,
      bacon: 1,
      cheese: 2,
      meat: 1
    },
    totalPrice: 4,
    purchasable: true
  };

  updatePurchaseState(ingredients) {
    const sum = Object.keys(ingredients).map(igKey => {
      return ingredients[igKey];
    }).reduce((sum, el) => {
      return sum + el;
    }, 0);
    this.setState({
      purchasable: sum > 0
    });
  }

  addIngredientHandler = (type) => {
    const newIngredients = this.state.ingredients;
    newIngredients[type] += 1;

    let newPrice = this.state.totalPrice;
    newPrice += INGREDIENT_PRICES[type];

    this.setState({
      ingredients: newIngredients,
      totalPrice: newPrice
    });
    this.updatePurchaseState(newIngredients);
  };

  dropIngredientHandler = (type) => {
    const newIngredients = this.state.ingredients;
    if (newIngredients[type] > 0) {
      newIngredients[type] -= 1;
      let newPrice = this.state.totalPrice;
      newPrice -= INGREDIENT_PRICES[type];

      this.setState({
        ingredients: newIngredients,
        totalPrice: newPrice
      });
      this.updatePurchaseState(newIngredients);
    }
  };

  render() {
    let disabledInfo = {...this.state.ingredients};
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    return (
      <Aux>
        <Burger ingredients={this.state.ingredients}/>
        <BuildControls ingredientAdd={this.addIngredientHandler}
                       ingredientDrop={this.dropIngredientHandler}
                       price={this.state.totalPrice}
                       purchasable={this.state.purchasable}
                       disabled={disabledInfo}
        />
      </Aux>
    )
  }
}

export default BurgerBuilder;