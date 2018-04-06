import 'babel-polyfill'
import Auth from './auth'
import restify from "restify"
import restify_cors_middleware from "restify-cors-middleware"
import passport from 'passport-restify'
import {BasicStrategy} from 'passport-http'
import BearerStrategy from 'passport-http-bearer'
import Executioner from "./executioner"
import Routes from "./routes"

export default () => {
  let server = restify.createServer()

  const cors = restify_cors_middleware({
    origins: ["*"],
    allowHeaders: ["*"],
    exposeHeaders: ["*"]
  })
  server.pre(cors.preflight)
  server.use(cors.actual)

  server.on("uncaughtException", function(req, res, err, cb) {
    console.log(err)
    return cb()
  })

  server.use(restify.plugins.queryParser())
  server.use(restify.plugins.bodyParser())
  server.use(restify.plugins.gzipResponse())
  server.use(passport.initialize())

  passport.use(new BearerStrategy({}, Auth.bearer))

  Routes(server, passport)

  server.listen(process.env.PORT || 8080, function() {
    console.log('%s listening at %s', server.name, server.url)
  })

  Executioner()
}
