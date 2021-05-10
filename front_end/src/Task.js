import React from 'react';
import styled from 'styled-components';
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { Draggable } from 'react-beautiful-dnd';

const Container = styled.div`
  border 1px solid lightgrey;
  border-radius: 2px;
  padding: 8px;
  margin-bottom: 8px;
  background-color: ${props => (props.isDragging ? 'lightgrey' : 'white')};
`;

export default class Task extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //text: props.text,
      deleted: false,
      showEditModal: false
    };
    this.deleteTask = this.deleteTask.bind(this);
    this.handleModalOpen = this.handleModalOpen.bind(this);
    this.handleModalClose = this.handleModalClose.bind(this);
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  deleteTask = () => {
    this.setState({ deleted: true });
  }

  handleModalOpen = () => {
    this.setState({ showEditModal: true });
  }

  handleModalClose = () => {
    this.setState({ showEditModal: false });
  }

  render() {

    return this.state.deleted ? null : (
      <div>
        <Draggable draggableId={this.props.task.id} index={this.props.index}>
          {(provided, snapshot) => (
            <Container
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              ref={provided.innerRef}
              isDragging={snapshot.isDragging}
              onClick={this.handleModalOpen}
            >
              {this.props.task.content}
            </Container>
          )}
        </Draggable>

        <Modal show={this.state.showEditModal} onHide={this.handleModalClose}>
          <Modal.Header>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>{"tao"}</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleModalClose}>
              Close
            </Button>
            <Button variant="danger" onClick={this.deleteTask}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </div>

    );
  }
}