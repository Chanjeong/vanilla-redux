import { useState } from 'react';
import { connect } from 'react-redux';
import { actionCreators } from '../store';

function Home({ toDos, dispatch }) {
  const [text, setText] = useState('');

  const onChange = e => {
    setText(e.target.value);
  };

  const onSubmit = e => {
    e.preventDefault();
    setText('');
    dispatch({ type: 'Add', text: text });
  };
  return (
    <>
      <h1>To do</h1>
      <form onSubmit={onSubmit}>
        <input type="text" placeholder="type what to do" onChange={onChange} value={text} />
        <button>Add</button>
      </form>
      <ul>
        {toDos.maps(toDo => (
          <li key={toDo.id}>
            <div>{toDo.text}</div>
          </li>
        ))}
      </ul>
    </>
  );
}

function mapStateToProps(state) {
  return { toDos: state };
}

function mapDispatchToProps(dispatch) {
  return {
    addToDo: text => dispatch(actionCreators.addTodo(text))
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Home);
