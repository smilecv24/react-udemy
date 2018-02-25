import React, {Component} from 'react';
import {connect} from 'react-redux';
import axios from '../../../axios-orders';

import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';

import Spiner from '../../../components/UI/Spiner/Spiner';
import Button from '../../../components/UI/Button/Button';
import Input from '../../../components/UI/Input/Input';
import classes from './ContractData.css';
import order from "../../../components/Order/Order";

import * as actions from '../../../store/actions/index';

class Contract extends Component {

  state = {
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Name'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      mail: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Your E-mail'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Street'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      postalCode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Post Code'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      country: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Country'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [
            {value: 'fastest', displayValue: 'Fastest'},
            {value: 'cheapest', displayValue: 'Cheapest'},
          ]
        },
        value: 'fastest',
        validation: {
          required: true
        },
        valid: true,
        touched: true
      }
    },
    formIsValid: false,
    loading: false
  };

  handlerOrderClick = (event) => {
    event.preventDefault();
    console.log(this.props.ingredients, this.props.price);

    // this.setState({loading: true});

    const formData = {};
    for (let formElement in this.state.orderForm) {
      formData[formElement] = this.state.orderForm[formElement];
    }

    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      orderData: formData
    };

    this.props.onOrderBurger(order);

    /*
        axios.post('/orders.json', order)
          .then(response => {
            console.log(response);
            this.setState({loading: false});
            this.props.history.push('/');
          })
          .catch(err => {
            console.log(err);
            this.setState({loading: false});
          });*/
  };

  checkValidity(value, rules) {

    let isValid = false;

    if (rules.required) {
      isValid = value.trim() !== '';
    }

    if (rules.isEmail) {
      const pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      isValid = pattern.test(value) && isValid
    }

    return isValid;
  }

  inputChangedHandler = (event, id) => {
    console.log(event.target.value, id);

    const updateOrderForm = {
      ...this.state.orderForm
    };

    const updateFormElement = {
      ...updateOrderForm[id]
    };

    updateFormElement.value = event.target.value;
    updateFormElement.valid = this.checkValidity(updateFormElement.value, updateFormElement.validation);
    updateFormElement.touched = true;

    updateOrderForm[id] = updateFormElement;

    let formIsValid = true;
    for (let inputIdentifier in updateOrderForm) {
      formIsValid = updateOrderForm[inputIdentifier].valid && formIsValid;
    }

    this.setState({orderForm: updateOrderForm, formIsValid: formIsValid});

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
          invalid={!formElement.config.valid}
          shouldValidate={formElement.config.validation}
          touched={formElement.config.touched}
          changed={(event) => this.inputChangedHandler(event, formElement.id)}
        />
      ))}

      <Button btnType='Success' disabled={!this.state.formIsValid}>Order</Button>

    </form>);
    if (this.props.loading) {
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

const mapStateToProps = (state) => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    loading: state.order.loading
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onOrderBurger: ((orderData) => dispatch(actions.purchaseBurger(orderData))),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Contract, axios));