'use strict'
import Actions from './actions'
import passport from 'passport-restify'
import restify from 'restify'

export default (server, passport) => {
    server.get("/api/token", passport.authenticate("basic", { session: false }), Actions.getToken)
    server.post("/api/account", Actions.newAccount)
    server.get("/api/setup", passport.authenticate("bearer", { session: false }) , Actions.getSetup);
    server.post("api/setup", passport.authenticate("bearer", { session: false }) , Actions.setSetup);
    server.post("/api/stream", passport.authenticate("bearer", { session: false }) , Actions.setStream);

    server.get(/.*/, restify.plugins.serveStatic({
        directory: "./dist",
        default: "index.html"
      }));
}
