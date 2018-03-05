import React from 'react';

export default class Header extends React.Component {
  constructor({ titulo, parrafo }) {
    super();

    this.titulo = titulo;
    this.parrafo = parrafo;
  };

  render() {
    return (
      <header>
        <h1>{this.titulo}</h1>
        <p>{this.parrafo}</p>
      </header>
    );
  }
}
