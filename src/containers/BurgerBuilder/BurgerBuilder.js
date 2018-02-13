import React, {Component} from 'react';
import Aux from '../../hoc/Aux_wrapper';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spiner from '../../components/UI/Spiner/Spiner';

import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';

const INGREDIENT_PRICES = {
  salat: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
};

class BurgerBuilder extends Component {

  state = {
    ingredients: null/*{
      salat: 1,
      bacon: 1,
      cheese: 2,
      meat: 1
    }*/,
    totalPrice: 4,
    purchasable: true,
    purchasing: false,
    loading: false,
    errorState: null
  };

  componentDidMount() {
    axios.get('/ingredients.json').then(response => {
        this.setState({ingredients: response.data});
      }
    ).catch(error => {this.setState({errorState: true})})
  }

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
    const queryParams = [];
    for (let i in this.state.ingredients) {
      queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
    }
    queryParams.push('price=' + this.state.totalPrice);
    this.props.history.push({
      pathname: '/checkout',
      search: queryParams.join('&')
    });
    // this.setState({loading: true});
    // const order = {
    //   ingredients: this.state.ingredients,
    //   price: this.state.totalPrice,
    //   customer: {
    //     name: 'Smile',
    //     address: {
    //       street: 'test Street',
    //       zipCode: '12345678',
    //       country: 'Ukraine'
    //     },
    //     email: 'test@test.com'
    //   },
    //   delivery: 'fastest'
    // };
    //
    // axios.post('/orders.json', order)
    //   .then(response => {
    //     console.log(response);
    //     this.setState({loading: false, purchasing: false});
    //   })
    //   .catch(err => {
    //     console.log(err);
    //     this.setState({loading: false, purchasing: false});
    //   });
  };

  render() {
    let disabledInfo = {...this.state.ingredients};
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let orderSummary = null;

    let burger = this.state.errorState ? <p>Ingredient not loaded</p> : <Spiner/>;
    if (this.state.ingredients) {
      burger = (
        <Aux>
          <Burger ingredients={this.state.ingredients}/>
          <BuildControls ingredientAdd={this.addIngredientHandler}
                         ingredientDrop={this.dropIngredientHandler}
                         purchasing={this.purchaseHandler}
                         price={this.state.totalPrice}
                         purchasable={this.state.purchasable}
                         disabled={disabledInfo}
          />
        </Aux>
      );
      orderSummary = <OrderSummary ingredients={this.state.ingredients}
                                   price={this.state.totalPrice}
                                   continuePurcasing={this.purchaseContinueHandler}
                                   cancelPurchasing={this.purchaseCancelHandler}/>;

    }

    if (this.state.loading) {
      orderSummary = <Spiner/>;
    }

    return (
      <Aux>
        <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    )
  }
}

export default withErrorHandler(BurgerBuilder, axios);