import React, {Component} from 'react';
import './App.css';
import Cockpit from '../components/Cockpit/Cockpit';
import Persons from '../components/Persons/Persons';

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
          <Persons persons={this.state.persons}
                   clicked={this.deletePersonHandler}
                   changed={this.changeNameHandler}
          />
        </div>
      )
    }

    return (
      <div className="App">
        <Cockpit clicked={this.togglePersonHandler}/>

        {persons}

      </div>
    );
  }

}

export default App;
