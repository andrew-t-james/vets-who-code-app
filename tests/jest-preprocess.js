const babelOptions = {
  babelrc: false,
  presets: [
    '@babel/preset-env',
    [
      '@babel/preset-react',
      {
        runtime: 'automatic',
      },
    ],
  ],
  plugins: ['@babel/plugin-proposal-class-properties', '@babel/plugin-proposal-optional-chaining'],
}

module.exports = require('babel-jest').createTransformer(babelOptions)
