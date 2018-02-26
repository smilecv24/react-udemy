import React, {Component} from 'react';

import {Route, Switch} from 'react-router-dom';

import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';
import Logout from "./containers/Auth/Logout/Logout";

class App extends Component {
  state = {
    show: true
  };

  /*componentDidMount() {
    setTimeout(() => {
      this.setState({show: false});
    }, 5000);
  }*/

  /**
   * Renders the component.
   */
  render() {

    return (
      /*<Layout>
        {this.state.show ? <BurgerBuilder/> : null}
        <Checkout/>
      </Layout>*/
      <Layout>
        <Switch>
          <Route path='/auth' component={Auth}/>
          <Route path='/logout' component={Logout}/>
          <Route path='/checkout' component={Checkout}/>
          <Route path='/orders' component={Orders}/>
          <Route path='/' exact component={BurgerBuilder}/>
        </Switch>
      </Layout>
    )
      ;
  }

}

export default App;
