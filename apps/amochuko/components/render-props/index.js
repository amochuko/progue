import React from 'react';

class Mouse extends React.Component {
  constructor(props) {
    super(props);
    this.state = { x: 0, y: 0 };
  }

  handleMouseMove = (e) => {
    this.setState({
      x: e.clientX,
      y: e.clientY,
    });
  };

  render() {
    return (
      <div
        style={{
          height: this.props.height,
          background: this.props.background,
        }}
        onMouseMove={this.handleMouseMove}
      >
        <p>
          the x:y - ({this.state.x}:{this.state.y})
        </p>
        {this.props.render(this.state)}
      </div>
    );
  }
}

class Cat extends React.Component {
  render() {
    return (
      <img
        src='/cat.jpg'
        alt='cat man'
        style={{
          position: 'absolute',
          left: this.props.mouse.x,
          top: this.props.mouse.y,
        }}
      />
    );
  }
}

export default class MouseTracker extends React.Component {
  render() {
    return (
      <div>
        <h1>Move the mouse around</h1>
        <Mouse
          height='100vh'
          background='cyan'
          render={(m) => <Cat mouse={m} />}
        />
      </div>
    );
  }
}
