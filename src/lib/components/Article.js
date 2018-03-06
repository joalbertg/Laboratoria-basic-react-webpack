import React from 'react';

export default class Article extends React.Component {
  render() {
    const { titulo, descripcion } = this.props;
    return (
      <article>
        <h3>{titulo}</h3>
        <p>{descripcion}</p>
        <hr />
      </article>
    );
  }
}
