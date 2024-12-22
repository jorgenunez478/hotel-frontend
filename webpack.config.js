const path = require('path');

module.exports = {
  entry: './src/index.js', // Punto de entrada de tu aplicación
  output: {
    path: path.resolve(__dirname, 'dist'), // Carpeta de salida
    filename: 'bundle.js', // Nombre del archivo de salida
  },
  resolve: {
    fallback: {
      "path": require.resolve("path-browserify")
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader', // Transpilar archivos JS usando Babel
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'], // Cargar archivos CSS
      },
    ],
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000, // Puerto del servidor de desarrollo
  },
};