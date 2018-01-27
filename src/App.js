import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person';
class App extends Component {
  state = {
    persons: [
      {name: 'Max', age: 28},
      {name: 'Manu', age: 29},
      {name: 'St', age: 26},
    ]
  };

  switchNameHandler = (name) => {
    this.setState({
      persons: [
        {name: name, age: 28},
        {name: 'Kristina', age: 29},
        {name: 'Stepan', age: 26},
      ]
    })
  };

  changeNameHandler = (event) => {
    this.setState({
      persons: [
        {name: 'Max', age: 28},
        {name: event.target.value, age: 29},
        {name: 'Stepan', age: 26},
      ]
    })
  };

  /**
   * Renders the component.
   */
  render() {
    return (
      <div className="App">
        <h1>Hello I am React</h1>
        {this.state.persons.map((person, index) => {
          return <Person name={person.name} age={person.age} key={index}/>;
        })}

        <button onClick={() => this.switchNameHandler('Smilecv24')}>Switch Name</button>

        <Person name={this.state.persons[0].name} age={this.state.persons[0].age} action={this.switchNameHandler.bind(this, 'Smile')}/>
        <Person name={this.state.persons[1].name} age={this.state.persons[1].age} changeName={this.changeNameHandler}>My Hobbies: Cars</Person>
        <Person name={this.state.persons[2].name} age={this.state.persons[2].age}/>
      </div>
    );
  }

}

export default App;
