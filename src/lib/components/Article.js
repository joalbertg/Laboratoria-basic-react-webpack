import React from 'react';
import PropTypes from 'prop-types';

export default class Article extends React.Component {
  render() {
    const { titulo, descripcion } = this.props;
    return (
      <article>
        <h3>{titulo}</h3>
        {/* <p>{descripcion}</p> */}
        {descripcion && (<p>{descripcion}</p>)}
        <hr />
      </article>
    );
  }
}

Article.propTypes = {
  titulo: PropTypes.string.isRequired,
  descripcion: PropTypes.string,
};

Article.defaultProps = {
  descripcion: ''
};
