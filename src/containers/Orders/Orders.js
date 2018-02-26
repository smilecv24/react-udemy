import React, {Component} from 'react';
import {connect} from 'react-redux';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spiner/Spiner';
import * as actions from '../../store/actions/index';

class Orders extends Component {

  // state = {orders: [], loading: true};

  componentDidMount() {
    this.props.onFetchOrders(this.props.token);
    /*axios.get('/orders.json').then(response => {
        const fetchedOrders = [];
        for (let key in response.data) {
          fetchedOrders.push({...response.data[key], id: key});
        }
        console.log(fetchedOrders);
        this.setState({orders: fetchedOrders, loading: false});
      }
    ).catch(err => {
      console.log(err);
      this.setState({loading: false})
    })*/
  }

  render() {
    let orders = <Spinner/>;

    if (!this.props.loading) {
      orders = (<div>
        {this.props.orders.map((order) => (
          <Order
            key={order.id}
            ingredients={order.ingredients}
            price={order.price}
          />
        ))}
      </div>)
    }

    return orders;
  }
}

const mapStateToProps = (state) => {
  return {
    orders: state.order.orders,
    loading: state.order.loading,
    token: state.auth.token,
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchOrders: ((token) => dispatch(actions.fetchOrders(token))),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));