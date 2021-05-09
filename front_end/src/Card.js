import React from "react";
// import Modal from "react-bootstrap/Modal";
// import Button from "react-bootstrap/Button";
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

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


    // return this.state.deleted ? null : (
    //   <div draggable={true} 
    //   onDragStart={event.dataTransfer.setData('text/plain', 'This text may be dragged')}>
    //     <div onClick={this.handleModalOpen} style={myStyle}>
    //       <p style={{ margin: '10px' }}>{this.state.text}</p>
    //     </div>

    //     <Modal show={this.state.showEditModal} onHide={this.handleModalClose}>
    //       <Modal.Header>
    //         <Modal.Title>Modal heading</Modal.Title>
    //       </Modal.Header>
    //       <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
    //       <Modal.Footer>
    //         <Button variant="secondary" onClick={this.handleModalClose}>
    //           Close
    //       </Button>
    //         <Button variant="danger" onClick={this.deleteCard}>
    //           Save Changes
    //       </Button>
    //       </Modal.Footer>
    //     </Modal>
    //   </div>
    // );

    const initialData = {
      tasks: {
        'task-1': {id: 'task-1', content: 'Take out garbage'},
        'task-2': {id: 'task-2', content: 'Go grocery shopping'},
        'task-3': {id: 'task-3', content: 'Cook Dinner'},
        'task-4': {id: 'task-4', content: 'Destroy world'},
      },
      columns: {
        'column-1': {
          id: 'column-1',
          title: 'To do',
          taskIds: ['task-1', 'task-2', 'task-3', 'task-4']
        }
      },
      columnOrder: ['column-1']

    };

    return (
      <div>s</div>
    );

  }
}

export default Card;