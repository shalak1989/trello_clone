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

//TODO add hover tooltip on column 

const Title = styled.h3`
  padding: 8px;
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
  constructor(props) {
    super(props);
    //if you pass this function in as a prop "this" will reference the context of the parent component

  }

  addTask = () => {
    this.props.addTask(this.props.column.id);
  }  

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
            <Button style={buttonStyles} variant="primary" onClick={this.addTask}>
              Add New Task
            </Button>
            <Droppable droppableId={this.props.column.id} type="task">
              {(provided) => (
                <TaskList
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  {/* {this.props.tasks.map((task, index) => (
                    <Task key={task.id} task={task} index={index} />
                  ))} */}
                  {this.props.tasks.map((task, index) => (
                    <Task key={task.id} title={task.title} id={task.id} index={index} />
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