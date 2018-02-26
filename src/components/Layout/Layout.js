import React, {Component} from 'react';
import {connect} from 'react-redux';
import Aux from '../../hoc/Aux_wrapper';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawler from '../Navigation/SideDrawler/SideDrawler';
import classes from './Layout.css';

class Layout extends Component {

  state = {
    showSidedrawler: false
  };

  sideDrawlerToggleHandler = () => {
    this.setState((prevState) => {
      return {showSidedrawler: !prevState.showSidedrawler};
    })
  };

  closedSidedrawlerHandler = () => (
    this.setState({showSidedrawler: false})
  );

  render() {
    return (
      <Aux>
        <Toolbar
          isAuth={this.props.isAuthenticated}
          drawerToggleClicked={this.sideDrawlerToggleHandler}/>
        <SideDrawler
          isAuth={this.props.isAuthenticated}
          show={this.state.showSidedrawler} clicked={this.closedSidedrawlerHandler}/>
        <main className={classes.Content}>{this.props.children}</main>
      </Aux>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null
  }
};

export default connect(mapStateToProps, null)(Layout);