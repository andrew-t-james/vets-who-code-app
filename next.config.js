const withPlugins = require('next-compose-plugins')
const withVideos = require('next-videos')
const withImages = require('next-images')

const config = {
  images: {
    domains: ['images.ctfassets.net'],
  },
  plugins: [
    'postcss-flexbugs-fixes',
    [
      'postcss-preset-env',
      {
        autoprefixer: {
          flexbox: 'no-2009',
        },
        stage: 3,
        features: {
          'custom-properties': false,
        },
      },
    ],
    [
      '@fullhuman/postcss-purgecss',
      {
        content: ['./pages/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
        defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || [],
      },
    ],
  ],
  target: 'serverless',
}

module.exports = withPlugins([withVideos, withImages], config)
