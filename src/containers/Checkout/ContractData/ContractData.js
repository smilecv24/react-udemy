import React, {Component} from 'react';
import axios from '../../../axios-orders';

import Spiner from '../../../components/UI/Spiner/Spiner';
import Button from '../../../components/UI/Button/Button';
import classes from './ContractData.css';

class Contract extends Component {

  state = {
    name: '',
    mail: '',
    address: {
      street: '',
      postalCode: ''
    },
    loading: false
  };

  handlerOrderClick = (event) => {
    event.preventDefault();
    console.log(this.props.ingredients, this.props.price);

    this.setState({loading: true});
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      customer: {
        name: 'Smile',
        address: {
          street: 'test Street',
          zipCode: '12345678',
          country: 'Ukraine'
        },
        email: 'test@test.com'
      },
      delivery: 'fastest'
    };

    axios.post('/orders.json', order)
      .then(response => {
        console.log(response);
        this.setState({loading: false});
        this.props.history.push('/');
      })
      .catch(err => {
        console.log(err);
        this.setState({loading: false});
      });
  };

  render() {
    let form = (<form>

      <input type="text" name="name" placeholder="Your Name"/>
      <input type="email" name="email" placeholder="Your Mail"/>
      <input type="text" name="street" placeholder="Your Street"/>
      <input type="text" name="post" placeholder="You Post Code"/>

      <Button btnType='Success' clicked={this.handlerOrderClick}>Order</Button>

    </form>);
    if (this.state.loading) {
      form = <Spiner/>;
    }

    return (
      <div className={classes.ContactData}>
        <h4>Contract Information</h4>
        {form}
      </div>
    )
  }

}

export default Contract;