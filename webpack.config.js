const { resolve } = require('path');

// importamos webpack
const webpack = require('webpack');
// ... y los plugins que habiamos instalado
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
  context: resolve(__dirname, 'src'),
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
