import React, {Component} from 'react';
import Aux from '../../hoc/Aux_wrapper';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

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
    purchasable: true,
    purchasing: false
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

  purchaseHandler = () => {
    this.setState({purchasing: true})
  };

  purchaseCancelHandler = () => {
    this.setState({purchasing: false})
  };

  purchaseContinueHandler = () => {
    alert('continue');
  };

  render() {
    let disabledInfo = {...this.state.ingredients};
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    return (
      <Aux>
        <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
          <OrderSummary ingredients={this.state.ingredients}
                        price={this.state.totalPrice}
                        continuePurcasing={this.purchaseContinueHandler}
                        cancelPurchasing={this.purchaseCancelHandler}/>
        </Modal>
        <Burger ingredients={this.state.ingredients}/>
        <BuildControls ingredientAdd={this.addIngredientHandler}
                       ingredientDrop={this.dropIngredientHandler}
                       purchasing={this.purchaseHandler}
                       price={this.state.totalPrice}
                       purchasable={this.state.purchasable}
                       disabled={disabledInfo}
        />
      </Aux>
    )
  }
}

export default BurgerBuilder;