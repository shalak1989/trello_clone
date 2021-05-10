import React from "react";
import Task from './Task';
import styled, { ThemeProvider } from 'styled-components';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import Button from "react-bootstrap/Button";

const Container = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  background-color: white;
  border-radius: 2px;
  width: 220px;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h3`
  padding: 8px;
  position: middle;
  margin: 0 auto;
`;
const TaskList = styled.div`
  padding: 8px;
  flex-grow: 1;
  min-height: 100px;
`;

const buttonStyles = {
  width: "75%",
  position: "middle",
  margin: "0 auto",
}

export default class Column extends React.Component {
  render() {
    return (
      <Draggable
        draggableId={this.props.column.id} index={this.props.index}
      >
        {provided => (
          <Container
            {...provided.draggableProps} ref={provided.innerRef}
          >
            <Title {...provided.dragHandleProps}>
              {this.props.column.title}
            </Title>
            <Button style={buttonStyles}  variant="primary" onClick={this.deleteTask}>
              Add New Task
            </Button>
            <Droppable droppableId={this.props.column.id} type="task">
              {(provided, snapshot) => (
                <TaskList
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  {this.props.tasks.map((task, index) => (
                    <Task key={task.id} task={task} index={index} />
                  ))}
                  {provided.placeholder}
                </TaskList>
              )}

            </Droppable>
          </Container>
        )}
      </Draggable>
    )
  }
}