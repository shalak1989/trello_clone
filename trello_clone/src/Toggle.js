import React from "react";

class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isToggleOn: true, deleted: false };
    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
    this.deleteButton = this.deleteButton.bind(this);
  }

  handleClick() {
    this.setState(state => ({
      isToggleOn: !state.isToggleOn
    }));
  }

  deleteButton() {
    this.setState(state => ({
      deleted: true
    }));
  }

  render() {
    return this.state.deleted ? null : (
      <div>
        <button onClick={this.handleClick}>
          {this.state.isToggleOn ? 'ON' : 'OFF'}
        </button>
        <button onClick={this.deleteButton}>DELETE toggle</button>
      </div>
    );
  }
}

export default Toggle;