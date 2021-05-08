import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

class Card extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: props.text,
      deleted: false,
      showEditModal: false
    };
    this.deleteCard = this.deleteCard.bind(this);
    this.handleModalOpen = this.handleModalOpen.bind(this);
    this.handleModalClose = this.handleModalClose.bind(this);

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

  handleModalOpen = () => {
    this.setState({ showEditModal: true });
  }

  handleModalClose = () => {
    this.setState({ showEditModal: false });
  }

  render() {
    //This is called everytime the setState changes
    const myStyle = {
      border: '1px solid',
      width: '260px',
      borderRadius: '8px'
    };


    return this.state.deleted ? null : (
      <div>
        <div onClick={this.handleModalOpen} style={myStyle}>
          <p style={{ margin: '10px' }}>{this.state.text}</p>
        </div>

        <Modal show={this.state.showEditModal} onHide={this.handleModalClose}>
          <Modal.Header>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleModalClose}>
              Close
          </Button>
            <Button variant="primary" onClick={this.handleModalClose}>
              Save Changes
          </Button>
          </Modal.Footer>
        </Modal>
      </div>

    );
  }
}

export default Card;