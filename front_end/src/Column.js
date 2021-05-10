import React from "react";
import Task from './Task';
import styled, { ThemeProvider } from 'styled-components';
import { Droppable, Draggable } from 'react-beautiful-dnd';

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
`;
const TaskList = styled.div`
  padding: 8px;
  flex-grow: 1;
  min-height: 100px;
`;

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