const withPlugins = require('next-compose-plugins')
const withVideos = require('next-videos')
const withImages = require('next-images')

module.exports = withPlugins([withImages, withVideos])
