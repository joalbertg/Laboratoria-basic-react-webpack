import React from 'react';

export default class Article extends React.Component {
  constructor({ titulo, descripcion }) {
    super();

    this.titulo = titulo;
    this.descripcion = descripcion;
  };

  render() {
    return (
      <article>
        <h3>{this.titulo}</h3>
        <p>{this.descripcion}</p>
        <hr />
      </article>
    );
  }
}
