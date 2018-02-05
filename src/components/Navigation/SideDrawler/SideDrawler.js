import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';

import classes from './SideDrawler.css';

const sideDrawler = (props) => {
  return (
    <div className={classes.SideDrawler}>
      <div className={classes.Logo}>
      <Logo/>
      </div>
      <nav>
        <NavigationItems/>
      </nav>
    </div>
  );
};

export default sideDrawler;