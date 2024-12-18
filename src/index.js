import { createStore } from 'redux';

const form = document.querySelector('form');
const input = document.querySelector('input');
const ul = document.querySelector('ul');

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

const todoStore = createStore(todoReducer);

const dispatchAddTodo = text => {
  todoStore.dispatch({ type: 'Add', text: text });
};

const dispatchDeleteTodo = e => {
  const id = parseInt(e.target.parentNode.id);
  todoStore.dispatch({ type: 'Delete', id: id });
};

const printTodo = () => {
  const todos = todoStore.getState();
  ul.innerHTML = '';
  todos.forEach(todo => {
    const li = document.createElement('li');
    const deleteButton = document.createElement('button');
    deleteButton.addEventListener('click', dispatchDeleteTodo);
    li.id = todo.id;
    li.innerText = todo.text;
    deleteButton.innerText = 'Delete';
    li.appendChild(deleteButton);
    ul.appendChild(li);
  });
};
todoStore.subscribe(printTodo);

const onSubmit = e => {
  e.preventDefault();
  const toDo = input.value;
  input.value = '';
  dispatchAddTodo(toDo);
};

form.addEventListener('submit', onSubmit);
