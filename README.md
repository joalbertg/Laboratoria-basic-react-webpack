# Configuración React-webpack

* `yarn init -y` para iniciar con yarn una app de `node`.

* Instalamos: 
  * `yarn add -D babel-cli babel-preset-react`
  * `yarn add react react-dom`
  * `yarn add -D babel-core babel-preset-es2015 babel-preset-react-boilerplate`
  * `yarn add -D webpack babel-loader style-loader css-loader html-webpack-plugin open-browser-webpack-plugin webpack-dev-server react-hot-loader@3.0.0-beta.6`
  * `yarn add -D webpack-cli`

* Para decirle a `babel` cuáles presets utilizar, creamos un archivo `.babelrc` en el root de nuestra aplicación, con el siguiente contenido.

```js
{
  "presets": [
    "es2015",
    "react",
    "react-boilerplate"
  ],
  "plugins": [
    "react-hot-loader/babel"
  ]
}
```
* Limpiamos nuestro `html` hasta que quede de la siguiente forma.

```html
<!DOCTYPE html>
<html>

<head>
  <meta charset="utf-8">
  <title>Ejemplo básico empaquetado con Webpack</title>
</head>

<body>
  <div id="container"></div>
</body>

</html>
```

Modificamos `page.js` para que importe a **React** en el scope, para que ya no se encargue de inyectar el resultado en el **DOM**, y para que se convierta en un módulo independiente, que exporte `Page` y `defaultPageProps`. En **React**, por convención los archivos donde viven los componentes, se llaman de la misma manera que los componentes que contienen. Entonces vamos a renombrar `page.js` por `Page.js`.

```js
// import React, { Component } from 'react';
// o podemos solo usar React y al extender la clase
// se llama con React.Component
import React from 'react';

// ... aqui va la definicion de tu componente
// y los `pageProps` por defecto

const pageProps = {
  //...
};

const Header = (/*...*/) => { /*...*/ };

const Article = (/*...*/) => { /*...*/ };

const Section = (/*...*/) => { /*...*/ };

const Aside = (/*...*/) => { /*...*/ };

// exportamos por defecto el componente `Page`
export default class Page extends React.Component {
  constructor({ headerTitulo, headerDescripcion, mainSectionTitulo, mainSectionArticles, asideTitulo, asideLinks }) {
    super();

    this.headerProps = {
      titulo: headerTitulo,
      parrafo: headerDescripcion
    };

    this.objSection = {
      title: mainSectionTitulo,
      articles: mainSectionArticles
    };

    this.objAside = {
      title: asideTitulo,
      links: asideLinks
    };
  };

  render() {
    return (
      <div>
        <Header {...this.headerProps} />
        <Section {...this.objSection} />
        <Aside {...this.objAside} />
      </div>
    );
  }
};

// exportamos las propiedades dinámicas por defecto de la página
// con el nombre "defaultPageProps"
export const defaultPageProps = pageProps;

// exportamos por defecto el componente `Page`
// export default Page;
// o podemos agregar export default directamente antes de definir la clase.
```

* Creamos un archivo `main.js` que configuraremos como `entry` de **webpack**. El será el encargado de renderizar `Page` e inyectar el resultado en el **DOM**.
```js
import React from 'react';
import ReactDOM from 'react-dom';

// Usamos un componente padre, para poder desarrollar mas agilmente
import { AppContainer } from 'react-hot-loader';

// Importamos el componente `Page` y las `defaultPageProps`
// usamos { name } si no es el export por defecto como 
// el caso de { defaultPageProps  }
import Page, { defaultPageProps  } from './page';

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
  module.hot.accept('./page', () => {
    const newApp = require('./page').default;
    render(newApp);
  });
}
```

* Creamos el archivo de configuración de `webpack`: `webpack.config.js`.
```js
const { resolve } = require('path');

// importamos webpack
const webpack = require('webpack');
// ... y los plugins que habiamos instalado
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
  devtool: 'cheap-module-eval-source-map',

  // definimos las entradas de nuestra aplicacion
  entry: [
    // las 3 primeras son para el hot reload
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server',
    // este es la que definimos en el punto anterior
    './main.js'
  ],

  // establecemos el output
  output: {
    filename: 'bundle.js',
    path: resolve(__dirname, 'build'),
    publicPath: '/',
  },

  // configuramos el servidor local de desarrollo
  devServer: {
    hot: true,
    contentBase: resolve(__dirname, 'build'),
    publicPath: '/'
  },

  // y establecemos qué tipo de archivos vamos a procesar y cómo
  module: {
    rules: [
      {
        test: /\.js$/, // todos los `js`
        loaders: [
          'babel-loader', // los procesamos con el loader de `babel`
        ],
        exclude: /node_modules/, // ignoramos archivos dentro de node_modules
      },

      // luego
      {
        test: /\.css$/, // todos los archivos `css`
        use: [
          { loader: "style-loader" }, // primero creamos un tag `style`
          { loader: "css-loader" } // y le injetamos el `css`
        ]
      }
    ]
  },

  // ... finalmente
  plugins: [
    // concatena los modulos importados
    new webpack.optimize.ModuleConcatenationPlugin(),
    // abre un navegador con la ruta de desarrollo
    new OpenBrowserPlugin({ url: 'http://localhost:8080' }),
    // habilita la opcion de hot module replacement (hot reload)
    new webpack.HotModuleReplacementPlugin(),
    // y por ultimo, inyecta el codigo dentro del `index.html`
    new HtmlWebpackPlugin({
      template: './index.html',
      filename: 'index.html',
      inject: 'body'
    })
  ]
};

module.exports = config;
```

* Reemplazas el `npm script` `start`, con el siguiente comando `webpack-dev-server --mode development`

* Desde tu terminal ejecutas `yarn start`.
