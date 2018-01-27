import React, {Component} from 'react';
import './App.css';
import Person from './Person/Person';

class App extends Component {
  state = {
    persons: [
      {name: 'Max', age: 28},
      {name: 'Manu', age: 29},
      {name: 'St', age: 26},
    ],
    showPersons: false
  };

  changeNameHandler = (event, index) => {
    const person = {...this.state.persons[index]};
    person.name = event.target.value;

    const persons = [...this.state.persons];
    persons[index] = person;

    this.setState({
      persons: persons
    });
  };

  togglePersonHandler = () => {
    const showPersons = this.state.showPersons;
    this.setState({
      showPersons: !showPersons
    });
  };

  deletePersonHandler = (indexPerson) => {
    // const persons = this.state.persons;
    // const persons = this.state.persons.slice();
    const persons = [...this.state.persons];
    persons.splice(indexPerson, 1);
    this.setState({
      persons: persons
    });
  };

  /**
   * Renders the component.
   */
  render() {

    let persons = null;

    if (this.state.showPersons) {
      persons = (
        <div>
          {this.state.persons.map((person, index) => {
            return <Person
              name={person.name}
              age={person.age}
              action={() => this.deletePersonHandler(index)}
              changeName={(event) => this.changeNameHandler(event, index)}
              key={index}/>;
          })}
        </div>
      )
    }

    return (
      <div className="App">
        <h1>Hello I am React</h1>

        <button onClick={this.togglePersonHandler}>Show/Hide</button>

        {persons}

      </div>
    );
  }

}

export default App;
