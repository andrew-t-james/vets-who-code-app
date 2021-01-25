const withPlugins = require('next-compose-plugins')
const withVideos = require('next-videos')
const withImages = require('next-images')

const config = {
  images: {
    domains: ['images.ctfassets.net'],
  },
  // target: 'serverless',
}

module.exports = withPlugins([withImages, withVideos], config)
