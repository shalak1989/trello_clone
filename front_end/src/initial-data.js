const initialData = {
  tasks: {
    'task-1': {id: 'task-1', title: 'Take out garbage'},
    'task-2': {id: 'task-2', title: 'Go grocery shopping'},
    'task-3': {id: 'task-3', title: 'Cook Dinner'},
    'task-4': {id: 'task-4', title: 'Destroy world'},
  },
  columns: {
    'column-1': {
      id: 'column-1',
      title: 'To do',
      taskIds: ['task-1', 'task-2', 'task-3', 'task-4']
    },
    'column-2': {
      id: 'column-2',
      title: 'In Progress',
      taskIds: []
    },
    'column-3': {
      id: 'column-3',
      title: 'Done',
      taskIds: []
    },    
  },
  // add more columns
  columnOrder: ['column-1', 'column-2', 'column-3']

};

export default initialData;