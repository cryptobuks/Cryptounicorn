'use strict'
import Actions from './actions'
import passport from 'passport-restify'
import restify from 'restify'

export default (server, passport) => {
    server.post("/api/token", Actions.getToken)
    server.post("/api/account", Actions.newAccount)
    server.get("/api/contract", passport.authenticate("bearer", { session: false }) , Actions.getContracts);
    server.post("/api/contract/participation", passport.authenticate("bearer", { session: false }) , Actions.newParticipation);
    server.post("/api/contract", passport.authenticate("bearer", { session: false }) , Actions.newContract);
    server.get("/api/user/setup", passport.authenticate("bearer", { session: false }) , Actions.getSetup);
    server.get("/api/user/details", passport.authenticate("bearer", { session: false }) , Actions.getDetails);
    server.post("api/user/setup", passport.authenticate("bearer", { session: false }) , Actions.setSetup);
    server.post("/api/stream", passport.authenticate("bearer", { session: false }) , Actions.setStream);

    server.get(/.*/, restify.plugins.serveStatic({
        directory: "./dist",
        default: "index.html"
      }));
}
