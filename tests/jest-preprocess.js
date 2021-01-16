const babelOptions = {
  presets: [
    '@babel/preset-env',
    [
      '@babel/preset-react',
      {
        runtime: 'automatic',
      },
    ],
  ],
}

module.exports = require('babel-jest').createTransformer(babelOptions)
