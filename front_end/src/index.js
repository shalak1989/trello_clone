import React from 'react';
import ReactDOM from 'react-dom';
import Column from './Column';
import initialData from './initial-data';
import styled from 'styled-components';
import Button from "react-bootstrap/Button";
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

const Container = styled.div`
  display: flex;
`;

class App extends React.Component {
  state = initialData
  debugger;
  onDragEnd = result => {
    const { destination, source, draggableId, type } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppable === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    if (type === 'column') {
      const newColumnOrder = Array.from(this.state.columnOrder);
      newColumnOrder.splice(source.index, 1);
      newColumnOrder.splice(destination.index, 0, draggableId);

      const newState = {
        ...this.state,
        columnOrder: newColumnOrder,
      };
      this.setState(newState);
      return;
    }

    const start = this.state.columns[source.droppableId];
    const finish = this.state.columns[destination.droppableId];

    if (start === finish) {

      const newTaskIds = Array.from(start.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...start,
        taskIds: newTaskIds,
      };

      const newState = {
        ...this.state,
        columns: {
          ...this.state.columns,
          [newColumn.id]: newColumn,
        }
      };


      this.setState(newState);

      return;
    }

    //Moving from one column to another
    const startTaskIds = Array.from(start.taskIds);
    startTaskIds.splice(source.index, 1);
    const newStart = {
      ...start,
      taskIds: startTaskIds,
    }

    const finishTaskIds = Array.from(finish.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);

    const newFinish = {
      ...finish,
      taskIds: finishTaskIds,
    };

    const newState = {
      ...this.state,
      columns: {
        ...this.state.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
    };
    this.setState(newState);
    console.log(this.state);

  };

  //react dev tools allows you analyze components and state (like VueJS's tools)

  addTask = (key) => {
    const taskTitle = prompt("Enter a title for the task");
    
    //generate key for react to track
    //could also go ddhhmmss
    const taskId = this.generateRandomId(taskTitle);

    const newTask = {
      id: taskId,
      title: taskTitle,
    }
    
    //update column
    const columnToModify = {...this.state.columns[key]};
    
    columnToModify.taskIds.push(newTask.id);
    const columns = {...this.state.columns};
    columns[key] = columnToModify;

    //update tasks
    const tasks = {...this.state.tasks};
    tasks[key] = newTask;

    //this.setState({ columns: [...this.state.tasks, newTask] });

    const newState = {
      ...this.state,
      tasks,
      columns
    };

    this.setState(newState);
    debugger;

    // const newTasks = [...this.state.tasks];
    // newTasks.push(newTask);
    // const newState = {
    //   ...this.state,
    //   tasks: [
    //     ...this.state.tasks,
    //     newTasks,
    //   ],
    // };
    // console.log(newState);
    // this.setState({ tasks: [...this.state.tasks, newTask] });
    // console.log(this.state.tasks);

  }

  generateRandomId(text) {
    return text.trim().replaceAll(' ', '') + Math.floor(Math.random() * 10000);
  }

  render() {
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        {/* the id for this droppable doesn't matter because it doesn't interact */}
        <Droppable
          droppableId="all-columns"
          direction="horizontal"
          type="column"
        >
          {(provided) => (
            <Container
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {this.state.columnOrder.map((columnId, index) => {
                const column = this.state.columns[columnId];
                const tasks = column.taskIds.map(taskId => this.state.tasks[taskId]);

                return <Column
                  key={column.id}
                  column={column}
                  tasks={tasks}
                  index={index}
                  addTask={this.addTask}
                />;
              })}
              {provided.placeholder}
            </Container>
          )}
        </Droppable>
      </DragDropContext>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));