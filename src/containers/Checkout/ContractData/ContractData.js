import React, {Component} from 'react';
import axios from '../../../axios-orders';

import Spiner from '../../../components/UI/Spiner/Spiner';
import Button from '../../../components/UI/Button/Button';
import Input from '../../../components/UI/Input/Input';
import classes from './ContractData.css';

class Contract extends Component {

  state = {
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Name'
        },
        value: ''
      },
      mail: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Your E-mail'
        },
        value: ''
      },
      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Street'
        },
        value: ''
      },
      postalCode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Post Code'
        },
        value: ''
      },
      country: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Country'
        },
        value: ''
      },
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [
            {value: 'fastest', displayValue: 'Fastest'},
            {value: 'cheapest', displayValue: 'Cheapest'},
          ]
        },
        value: ''
      }
    },

    loading: false
  };

  handlerOrderClick = (event) => {
    event.preventDefault();
    console.log(this.props.ingredients, this.props.price);

    this.setState({loading: true});

    const formData = {};
    for (let formElement in this.state.orderForm) {
      formData[formElement] = this.state.orderForm[formElement];
    }

    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      orderData: formData
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

  inputChangedHandler = (event, id) => {
    console.log(event.target.value, id);

    const updateOrderForm = {
      ...this.state.orderForm
    };

    const updateFormElement = {
      ...updateOrderForm[id]
    };

    updateFormElement.value = event.target.value;

    updateOrderForm[id] = updateFormElement;
    this.setState({orderForm: updateOrderForm});

  };

  render() {

    const formElementsArray = [];
    for (let key in this.state.orderForm) {
      formElementsArray.push({
        id: key,
        config: this.state.orderForm[key]
      });
    }


    let form = (<form onSubmit={this.handlerOrderClick}>

      {formElementsArray.map(formElement => (
        <Input
          key={formElement.id}
          elementType={formElement.config.elementType}
          elementConfig={formElement.config.elementConfig}
          value={formElement.config.value}
          changed={(event) => this.inputChangedHandler(event, formElement.id)}
        />
      ))}

      <Button btnType='Success'>Order</Button>

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