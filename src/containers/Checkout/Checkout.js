import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import {connect} from 'react-redux';


import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContractForm from './ContractData/ContractData';

class Checkout extends Component {

/*
  componentDidMount() {
    const search = this.props.location.search; // could be '?foo=bar'
    let search2 = search.slice(1).split('&');
    let price = 0;
    const ingredients_query = {};

    search2.map(item => {
      let tmp = item.split('=');
      if (tmp[0] !== 'price') {
        return ingredients_query[tmp[0]] = +tmp[1];
      } else {
        return price = +tmp[1];
      }
    });
    console.log(ingredients_query);
    this.setState({ingredients: ingredients_query, price: price});
  }
*/

  handleCancelClicked = () => (
    this.props.history.goBack()
  );

  handleContinueClicked = () => (
    this.props.history.replace('/checkout/contact-data')
  );

  render () {
    console.log(this.props.ings);
    return (
      <div>
        <CheckoutSummary ingredients={this.props.ings}
                         handleCancelClick={this.handleCancelClicked}
                         handleContinueClick={this.handleContinueClicked}/>
        <Route path={this.props.match.path + '/contact-data'}
               render={(props) => (<ContractForm ingredients={this.props.ings} price={this.props.price} {...props}/>)}/>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    ings: state.ingredients,
    price: state.totalPrice
  }
};

export default connect(mapStateToProps)(Checkout);