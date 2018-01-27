import React, { Component } from 'react';

class AddItem extends Component {

  constructor(props) {
    super();
    this.state = {
      newItem:{},
      newValue: '',
      addItem: props.addItem
    }
  }

  handleChange(event) {
    this.setState({newValue: event.target.value});
    // value={this.state.newValue} onChange={this.handleChange.bind(this)}
  }

  handleSubmit(e) {
      e.preventDefault(); // this prevents the page from reloading -- do not delete this line!

      // Implement the rest of this function here!
      let item = {}; //creating copy of object
      item['id'] = this.props.idName;
      item['value'] = this.refs.id.value;

      this.state.newItem = item;
      this.state.addItem(this.state.newItem);
      // this.setState({newValue: '', newItem: {}});
  }
    

  render() {
    var divName = 'add' + this.props.idName;
    return (
      <div className='addItemDiv'>
      <h4>Add {this.props.idName}</h4>
      <form ref='form' onSubmit={this.handleSubmit.bind(this)}>
      <div id={divName} ref={divName}>
        <label>Name</label><br />
        <input type='text' ref='id'/>
        </div>
        <br />
        <input type='submit' value='Submit' />
        <br />
      </form>
      </div>
    );
  }

}

export default AddItem;
