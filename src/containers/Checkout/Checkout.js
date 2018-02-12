import React, {Component} from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

class Checkout extends Component {

  state = {
    ingredients: {}
  };

  componentDidMount() {
    const search = this.props.location.search; // could be '?foo=bar'
    let search2 = search.slice(1).split('&');
    const ingredients_query = {};

    search2.map(item => {
      let tmp = item.split('=');
      return ingredients_query[tmp[0]] = +tmp[1];
    });
    this.setState({ingredients: ingredients_query});
  }

  handleCancelClicked = () => (
    this.props.history.goBack()
  );

  handleContinueClicked = () => (
    this.props.history.replace('/checkout/contact-data')
  );

  render () {
    console.log(this.state.ingredients);
    return (
      <div>
        <CheckoutSummary ingredients={this.state.ingredients}
                         handleCancelClick={this.handleCancelClicked}
                         handleContinueClick={this.handleContinueClicked}/>
      </div>
    )
  }
}

export default Checkout;