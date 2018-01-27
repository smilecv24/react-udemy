import React, { Component } from 'react';

class AddList extends Component {
 constructor(props) {
    super();
    this.state = {
      newID: '',
      addID: props.addList
    };
  }

  handleChange(event) {
    //value={this.state.newID} onChange={this.handleChange.bind(this)}
    this.setState({newID: event.target.value});
  }

  handleSubmit(e) {
      e.preventDefault(); // this prevents the page from reloading -- do not delete this line!
      this.state.newID = this.refs.id.value;
      this.state.addID(this.state.newID);
      this.setState({newID: ''});
      // Implement the rest of this function here!

  }

  render() {
    return (
      <div id="addListDiv">
      <form onSubmit={this.handleSubmit.bind(this)}>
      <div id='addList'>
      <label>What will be on your next list?&nbsp;
      <input type='text' ref='id' id='newID'/>
      </label>
      </div><br />
      <input type='submit' value='Create List' />
      </form>
      </div>
    );
  }
}

export default AddList;
