import Vue from 'vue'
import Router from 'vue-router'
import Bet from '../views/Bet'
import Plan from "../views/Plan"
import Home from "../views/Home";



window.bus = new Vue();
Vue.use(Router)

export default new Router({
  mode: "hash",
  routes: [
    {
      path: "/bet",
      component: Bet
    },
    {
      path: "/",
      component: Home
    },
    {
      path: "/plan",
      component: Plan
    }
  ]
});
