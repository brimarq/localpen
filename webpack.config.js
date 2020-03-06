const path = require('path');
const MiniHtmlWebpackPlugin = require('mini-html-webpack-plugin');
const miniHtmlWebpackPluginTemplate = require('@vxna/mini-html-webpack-template');
const postCssUse = require('postcss-use');
const codePenPostCssPlugins = [
  'lost',
  'postcss-apply',
  'postcss-color-function',
  'postcss-conditionals',
  'postcss-custom-media',
  'postcss-discard-comments',
  'postcss-each',
  'postcss-extend',
  'postcss-flexbox',
  'postcss-for',
  'postcss-media-minmax',
  'postcss-mixins',
  'postcss-nested',
  'postcss-nested-ancestors',
  'postcss-preset-env',
  'postcss-reverse-media',
  'postcss-simple-vars',
  'postcss-triangle'
];

module.exports = {
  devServer: { 
    port: 3000,
    hot: true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              [
                '@babel/preset-env', 
                { modules: false }
              ]
            ]
          }
        }
      },
      {
        test: /\.pug$/,
        include: path.resolve(__dirname, 'src'),
        use: ['pug-loader']
      },
      {
        test: /\.css$/,
        use: [
          'style-loader', 
          { 
            loader: 'css-loader', 
            options: { importLoaders: 1 } 
          }, 
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [
                postCssUse({ modules: codePenPostCssPlugins }),
              ]
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new MiniHtmlWebpackPlugin({
      context: {
        lang: 'en',
        title: 'My LocalPen',
        container: 'root',
        head: {
          links: [
            { rel: "stylesheet", href: "https://cdn.jsdelivr.net/npm/bulma@0.8.0/css/bulma.min.css" }
          ],
          scripts: [
            { defer: true, src: "https://use.fontawesome.com/releases/v5.3.1/js/all.js" }
          ]
        },
        body: {
          scripts: [
            // Uncomment the object below for the fCC Test Suite
            // { src: 'https://cdn.freecodecamp.org/testable-projects-fcc/v1/bundle.js' }
          ]
        },
        trimWhitespace: true
      },
      template: miniHtmlWebpackPluginTemplate
    })
  ]
};