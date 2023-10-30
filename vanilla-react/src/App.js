// @ts-nocheck
import React, { useReducer } from 'react';
import { hot } from 'react-hot-loader';
import './App.css';

const initialState = {
  color: 'black',
  pet: 'cat',
};

const types = {
  PET: 'PET',
  COLOR: 'COLOR',
};

const reducer = (state, action) => {
  switch (action.type) {
    case types.PET:
      return { ...state, pet: action.value };
    case types.COLOR:
      return { ...state, color: action.value };
  }
};

function SelectApp() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div>
      <label>Choose a color and aa pet:</label>
      <br />
      <select
        value={state.color}
        onChange={(e) => dispatch({ type: types.COLOR, value: e.target.value })}
      >
        <option value='black'>Black</option>
        <option value='pink'>Pink</option>
        <option value='blue'>Blue</option>
      </select>
      <select
        value={state.pet}
        onChange={(e) => {
          dispatch({ type: types.PET, value: e.target.value });
        }}
      >
        <option value='cat'>Cat</option>
        <option value='dog'>Dog</option>
        <option value='mouse'>Mouse</option>
      </select>
      <br />
      <br />
      You chose a {state.color} {state.pet}
    </div>
  );
}
class App extends React.Component {
  render() {
    const style = {
      padding: '40px',
      textAlign: 'center',
    };
    return (
      <div className='App' style={style}>
        <h1>Hello, World!</h1>
      </div>
    );
  }
}

export default hot(module)(App);
