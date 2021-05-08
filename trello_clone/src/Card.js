import React from "react";
import ReactDOM from 'react-dom';

class Card extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: props.text,
      deleted: false,
      showEditModal: false
    };
    this.deleteCard = this.deleteCard.bind(this);
    this.editCard = this.editCard.bind(this);

  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  deleteCard() {
    this.setState(state => ({
      deleted: true
    }));
  }

  editCard() {
    this.setState(state => ({
      showEditModal: true
    }));
  }

  render() {
    //This is called everytime the setState changes
    const myStyle = {
      border: '1px solid',
      width: '260px',
      borderRadius: '8px'
    };

    return this.state.deleted ? null : (
      <div onClick={this.editCard} style={myStyle}>
        <p style={{ margin: '10px' }}>{this.state.text}</p>
        {
          !this.state.showEditModal ? null :
            (
              <div>
                <p>I am modal</p>
              </div>
            )
        }
      </div>
    );
  }
}

export default Card;