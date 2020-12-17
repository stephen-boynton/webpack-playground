const { mode } = require('webpack-nano/argv')
const {merge} = require('webpack-merge')
const parts = require("./webpack.parts")

const commonConfig = merge([
  { entry: ['./src'] },
  parts.page({ title: 'Demo' })
])

const productionConfig = merge([])

const developementConfig = merge([
  { entry: ["webpack-plugin-serve/client"] },
  parts.devServer()
])

const getConfig = (mode) => {
  process.env.NODE_ENV = mode
  switch(mode){
    case "production":
      return merge(commonConfig, productionConfig, { mode })
    case "development":
      return merge(commonConfig, developementConfig, { mode })
    default:
      throw new Error(`Unknown mode: ${mode}`)
  }
}

module.exports = getConfig(mode)