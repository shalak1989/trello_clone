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
      title: props.title,
      deleted: false,
      content: props.content ? props.content : "",
      showEditModal: false,
      index: props.index,
      id: props.id
    };
    this.deleteTask = this.deleteTask.bind(this);
    this.handleModalOpen = this.handleModalOpen.bind(this);
    this.handleModalClose = this.handleModalClose.bind(this);
    this.handleFieldChange = this.handleFieldChange.bind(this);
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

  handleFieldChange(e, field) {
    this.setState({
      [field]: e.target.value
    });
  }

  render() {

    return this.state.deleted ? null : (
      <div>
        <Draggable draggableId={this.state.id} index={this.props.index}>
          {(provided, snapshot) => (
            <Container
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              ref={provided.innerRef}
              isDragging={snapshot.isDragging}
              onClick={this.handleModalOpen}
            >
              {this.state.title}
            </Container>
          )}
        </Draggable>

        <Modal show={this.state.showEditModal} onHide={this.handleModalClose}>
          <Modal.Header>
            <Modal.Title>
              <input
                type="text"
                value={this.state.title}
                onChange={e => this.handleFieldChange(e, "title")}
              />
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <input
              type="text"
              value={this.state.content}
              onChange={e => this.handleFieldChange(e, "content")}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleModalClose}>
              Close
            </Button>
            <Button variant="danger" onClick={this.deleteTask}>
              Delete Card
            </Button>
          </Modal.Footer>
        </Modal>
      </div>

    );
  }
}