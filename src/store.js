import { createStore } from 'redux';

const todoReducer = (state = [], action) => {
  switch (action.type) {
    case 'Add':
      return [{ text: action.text, id: Date.now() }, ...state];
    case 'Delete':
      return state.filter(todo => todo.id !== action.id);
    default:
      return state;
  }
};

export const actionCreators = {
  addTodo: text => ({ type: 'Add', text }),
  deleteTodo: id => ({ type: 'Delete', id })
};

export const todoStore = createStore(todoReducer);
