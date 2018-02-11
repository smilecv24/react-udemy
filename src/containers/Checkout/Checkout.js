import React, {Component} from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

class Checkout extends Component {

  state = {
    ingredients: {
      salat: 1,
      bacon: 1,
      cheese: 2,
      meat: 1
    }
  };

  render () {
    return (
      <div>
        <CheckoutSummary ingredients={this.state.ingredients}/>
      </div>
    )
  }
}

export default Checkout;