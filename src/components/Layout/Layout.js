import React from 'react';
import Aux from '../../hoc/Aux_wrapper';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawler from '../Navigation/SideDrawler/SideDrawler';
import classes from './Layout.css';

const layout = (props) => (
  <Aux>
    <Toolbar/>
    <SideDrawler/>
    <main className={classes.Content}>{props.children}</main>
  </Aux>
);

export default layout;