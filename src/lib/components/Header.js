import React from 'react';

export default class Header extends React.Component {
  render() {
    const { titulo, parrafo } = this.props;

    return (
      <header>
        <h1>{titulo}</h1>
        <p>{parrafo}</p>
      </header>
    );
  }
}
