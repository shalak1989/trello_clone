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
    this.state = {
      tasks: props.tasks,
      index: props.index
    }
    // this.state = {
    //   //text: props.text,
    //   deleted: false,
    //   showEditModal: false
    // };
    // this.deleteTask = this.deleteTask.bind(this);
    // this.handleModalOpen = this.handleModalOpen.bind(this);
    this.addTask = this.addTask.bind(this);
    this.generateRandomId = this.generateRandomId.bind(this);
  }



  //current this isn't working, ran out of time to fix
  addTask() {
    const taskTitle = prompt("Enter a title for the task");
    const len = this.props.tasks.length
    //const index = len > 0 ? len : 0
    const taskId = this.generateRandomId(taskTitle);
    const newTask = {
      id: taskId,
      title: taskTitle,
    }
    
    const newTasks = [...this.state.tasks];
    newTasks.push(newTask);
    const newState = {
      ...this.state,
      tasks: [
        ...this.state.tasks,
        newTasks,
      ],
    };
    console.log(newState);
    this.setState(newState);
    console.log(this.state.tasks);
  
  }

  generateRandomId(text) {
    return text.trim().replaceAll(' ', '') + Math.floor(Math.random() * 10000);
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