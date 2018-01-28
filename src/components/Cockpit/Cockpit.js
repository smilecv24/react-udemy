import React from 'react';

const cockpit = (props) => {
  return (
    <div>
      <h1>Hello I am React</h1>
      <button onClick={props.clicked}>Show/Hide</button>
    </div>
  )
};

export default cockpit;