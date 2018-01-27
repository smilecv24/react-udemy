import React from 'react';
import './Person.css';

const person = (props) => {
  return (
    <div className='Person'>
      <p onClick={props.action}>I'm a {props.name} and I'm a {props.age} years old!</p>
      <p>{props.children}</p>
      <input type="text" onChange={props.changeName} value={props.name}/>
    </div>
  )
};

export default person;