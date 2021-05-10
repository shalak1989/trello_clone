import React from 'react';
import ReactDOM from 'react-dom';
import Column from './Column';
import initialData from './initial-data';
import { DragDropContext } from 'react-beautiful-dnd';

class App extends React.Component {
  state = initialData

  onDragEnd = result => {
    const { destination, source, draggableId } = result;

    if (!destination){
      return;
    }

    if (
      destination.dropabbleId === source.dropabbleId &&
      destination.index === source.index
    ) {
      return;
    }

    const column = this.state.columns[source.dropabbleId];
    const newTaskIds = Array.from(column.taskIds);
    newTaskIds.splice(source.index, 1);
    newTaskIds.splice(destination.index, 0, draggableId);

    const newColumn = {
      ...column,
      taskIds: newTaskIds,
    };

    const newState = {
      ...this.state,
      columns: {
        ...this.state.columns,
        [newColumn.id]: newColumn,
      }
    }

    this.setState(newState);
  };

  render() {
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        {
          this.state.columnOrder.map(columnId => {
            const column = this.state.columns[columnId];
            const tasks = column.taskIds.map(taskId => this.state.tasks[taskId]);

            return <Column key={column.id} column={column} tasks={tasks} />;
          })
        }
      </DragDropContext>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));