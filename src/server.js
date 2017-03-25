import log4js from 'log4js'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
// import models, { configure } from 'demo-model'
import models, { configure } from 'demo-model'
import config from './config'
import authorization from './authorization'
import * as route from './route'

global.models = models
global.config = config

const instance = process.env.NODE_APP_INSTANCE

const log = log4js.getLogger()

async function server() {
  const { __TEST__ } = global
  if (!__DEV__) {
    log.setLevel('INFO')
  }

  let port = config.server.port
  if (instance) port += instance

  // 创建，或更新数据库版本
  try {
    const manager = await configure(config)
    await manager.update()
    log.info(`database version: ${manager.version}`)
  } catch (err) {
    return log.error(err)
  }

  const express = require('express')

  const app = express()
  const apiRouter = new express.Router()

  if (__DEV__ && !__TEST__) {
    apiRouter.use(
      log4js.connectLogger(
        log,
        { level: 'auto', format: ':method :url :status :response-timems' },
      ),
    )

    // 开发模式下，模拟网络延迟
    app.use((req, res, next) => {
      setTimeout(next, 1000)
    })
  }

  apiRouter.use(cookieParser(config.secret.cookie))
  apiRouter.use(bodyParser.json())
  apiRouter.use(authorization(config))

  route.bind(apiRouter)
  app.use('/', apiRouter)

  if (__TEST__) return app

  return app.listen(port, () => {
    /* eslint-disable no-undef */
    log.info(`The server [${config.name}] running on port: ${port}`)
  })
}

export default () =>
  server().catch((e) => {
    log.error(e)
    throw e
  })
