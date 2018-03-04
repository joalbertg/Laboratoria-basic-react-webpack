import React from 'react';
import ReactDOM from 'react-dom';

// Usamos un componente padre, para poder desarrollar mas agilmente
import { AppContainer } from 'react-hot-loader';

// Importamos el componente `Page` y las `defaultPageProps`
// usamos { name } si no es el export por defecto como 
// el caso de { defaultPageProps  }
import Page, { defaultPageProps  } from './lib/Page';

// Aquí vemos un poco de la magia de webpack
// esta instrucción se encargara de inyectar el codigo de `styles.css`
// dentro de un tag `<style>` en nuestro `html` resultante
// import './styles.css';

// Creamos una funcion utilitaria para renderizar todos nuestros componentes
// usando el componente padre, previamente importado
const render = (Component, props = {}) => {
  ReactDOM.render(
    <AppContainer>
      <Component {...props} />
    </AppContainer>,
    document.getElementById('container'),
  );
};

// renderizamos la página con sus props
render(Page, defaultPageProps);

// y si hay algún cambio, recargamos la página "on-the-fly"
// sin necesidad de que refresquemos el navegador
if (module.hot) {
  module.hot.accept('./lib/Page', () => {
    const newApp = require('./lib/Page').default;
    render(newApp);
  });
}
