import React, {Component} from 'react';
import {connect} from 'react-redux';
import Aux from '../../hoc/Aux_wrapper';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spiner from '../../components/UI/Spiner/Spiner';

import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';
import * as actionTypes from '../../store/actions';

class BurgerBuilder extends Component {

  state = {
    /*ingredients: null/!*{
      salat: 1,
      bacon: 1,
      cheese: 2,
      meat: 1
    }*!/,*/
    totalPrice: 4,
    purchasable: true,
    purchasing: false,
    loading: false,
    errorState: null
  };

  componentDidMount() {
    /*axios.get('/ingredients.json').then(response => {
        this.setState({ingredients: response.data});
      }
    ).catch(error => {this.setState({errorState: true})})*/
  }

  updatePurchaseState(ingredients) {
    const sum = Object.keys(ingredients).map(igKey => {
      return ingredients[igKey];
    }).reduce((sum, el) => {
      return sum + el;
    }, 0);
    return sum > 0;
  }

  /*addIngredientHandler = (type) => {
    const newIngredients = this.props.ings;
    newIngredients[type] += 1;

    let newPrice = this.props.price;
    newPrice += INGREDIENT_PRICES[type];

    this.setState({
      ingredients: newIngredients,
      totalPrice: newPrice
    });
    this.updatePurchaseState(newIngredients);
  };

  dropIngredientHandler = (type) => {
    const newIngredients = this.props.ings;
    if (newIngredients[type] > 0) {
      newIngredients[type] -= 1;
      let newPrice = this.props.price;
      newPrice -= INGREDIENT_PRICES[type];

      this.setState({
        ingredients: newIngredients,
        totalPrice: newPrice
      });
      this.updatePurchaseState(newIngredients);
    }
  };
*/
  purchaseHandler = () => {
    this.setState({purchasing: true})
  };

  purchaseCancelHandler = () => {
    this.setState({purchasing: false})
  };

  purchaseContinueHandler = () => {
    const queryParams = [];
    for (let i in this.props.ings) {
      queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.props.ings[i]));
    }
    queryParams.push('price=' + this.props.price);
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
    let disabledInfo = {...this.props.ings};
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let orderSummary = null;

    let burger = this.state.errorState ? <p>Ingredient not loaded</p> : <Spiner/>;
    if (this.props.ings) {
      burger = (
        <Aux>
          <Burger ingredients={this.props.ings}/>
          <BuildControls ingredientAdd={this.props.onIngredientAdd}
                         ingredientDrop={this.props.onIngredientRemove}
                         purchasing={this.purchaseHandler}
                         price={this.props.price}
                         purchasable={this.updatePurchaseState(this.props.ings)}
                         disabled={disabledInfo}
          />
        </Aux>
      );
      orderSummary = <OrderSummary ingredients={this.props.ings}
                                   price={this.props.price}
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

const mapStateToProps = (state) => {
  return {
    ings: state.ingredients,
    price: state.totalPrice
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdd: (ingName => dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName: ingName})),
    onIngredientRemove: (ingName => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName}))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));