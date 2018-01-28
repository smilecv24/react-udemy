import React from 'react';
import Person from '../Persons/Person/Person';

const persons = (props) =>
  props.persons.map((person, index) => {
    return <Person
      name={person.name}
      age={person.age}
      action={() => props.clicked(index)}
      changeName={(event) => props.changed(event, index)}
      key={index}/>;
  }
);

export default persons;