import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Aux_wrapper';
import classes from './SideDrawler.css';

const sideDrawler = (props) => {
  let attachedClasses = [classes.SideDrawler, classes.Close];
  if (props.show) {
    attachedClasses = [classes.SideDrawler, classes.Open]
  }
  return (
    <Aux>
      <Backdrop show={props.show} clicked={props.clicked}/>
      <div className={attachedClasses.join(' ')} onClick={props.clicked}>
        <div className={classes.Logo}>
          <Logo/>
        </div>
        <nav>
          <NavigationItems isAuthenticated={props.isAuth}/>
        </nav>
      </div>
    </Aux>
  );
};

export default sideDrawler;