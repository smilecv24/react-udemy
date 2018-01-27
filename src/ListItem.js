import React, { Component } from 'react';

class ListItem extends Component {

    constructor(props) {
	super(props);
	this.state = { color: 'black' };
    }

    handleClick() {
	// Implement this function!
      let color = '';
      if (this.state.color === 'black') {
        color = 'gray';
      } else {
        color = 'black';
      }
      this.setState({color: color});
    }

    handleDoubleClick() {
      // Implement this function!  onDoubleClick={this.handleDoubleClick.bind(this)}
      if (this.state.color === 'gray') {
        let color = 'black';
        this.setState({color: color});
      }
    }

  render() {
    var item = this.props.item;
    var name = item.name;

    return (
	    <span onClick={this.handleClick.bind(this)} style={{color: this.state.color}}>
        <strong>{name}</strong>
      </span>
    );

  }

}
export default ListItem;

