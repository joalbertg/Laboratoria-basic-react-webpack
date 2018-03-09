import React from 'react';

// primero y antes que nada, importamos la dependencia
import PropTypes from 'prop-types';

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

// Y ahora realizamos la definición de los tipos
Header.propTypes = {
  // `titulo` es de tipo `string` y es requerido
  titulo: PropTypes.string.isRequired,
  // `parrafo` tb es de tipo `string`
  // y es opcional (solo omitimos el `isRequired`)
  parrafo: PropTypes.string
};

Header.defaultProps = {
  // Como `parrafo` es opcional, es una práctica recomendada establecerle
  // un valor por defecto, en nuestro caso "string vacio"
  parrafo: ''
};
