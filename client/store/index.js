import Vue from 'vue'
import Vuex from 'vuex'
import {$} from '../$'
let ccxt = require("ccxt")
Vue.use(Vuex)

const initial = {
  exchanges: [],
  indicators: [],
  session: null,
  ENDPOINT: "/api/"
};

const state = initial;

const mutations = {
  addExchange(state, id) {
    state.exchanges.push({
      id: id,
      api: new ccxt[id]({}),
      pairs: []
    });
  },
  async start(state, token) {
    console.log(token)
    state.session = {
      token: token,
      details: (await (await fetch(state.ENDPOINT + "user/details", {
          method: 'GET',
          headers: new Headers({
            'Authorization': 'Bearer ' + token
          })
        })).json()).details
    };
  },
  async update(state) {
    state.session = {
          token: state.session.token,
          details: (await (await fetch(state.ENDPOINT + "user/details", {
              method: 'GET',
              headers: new Headers({
                'Authorization': 'Bearer ' + state.session.token
              })
            })).json()).details
        };
  },
  end(state) {
    state = initial
  },
  downloadState() {},
  emptyIndicator(state) {
    state.indicators.push({});
  },
  addIndicator(state, data) {
    data.id = Math.round(new Date().getTime());
    state.indicators.push(data);
  },
  removeExchange(state, id) {
    for (let i in state.exchanges)
      if (state.exchanges[i].id == id) {
        state.exchanges.splice(i, 1);
        break;
      }
  },
  removeIndicator(state, id) {
    for (let i in state.indicators)
      if (state.indicators[i].id == id) {
        state.indicators.splice(i, 1);
        break;
      }
  },
  updateIndicator(state, data) {
    for (let i in state.indicators)
      if (state.indicators[i].id == data.id) state.indicators[i] = data;
  },
  updatePairs(state, data) {
    let pairs = data.pairs,
      id = data.id;
    for (let i in state.exchanges)
      if (state.exchanges[i].id == id) {
        state.exchanges[i].pairs = pairs;
        break;
      }
    $.$emit("pairs:updates");
  },
  reset() {
    state.exchanges = [];
    state.indicators = [];
  },
  test(state) {
    state.session = {
      test: true
    };
  }
};

const getters = {
  getDetails() {
    return state.session.details;
  },
  getExchanges: state => {
    return state.exchanges;
  },
  getIndicators: state => {
    return state.indicators;
  },
  get_: state => {
    let exchs = state.exchanges;
    for(let i in exchs)
      delete exchs[i].api;
    exchs = JSON.parse(JSON.stringify(exchs));
    return new Proxy(exchs, {
      get(target1, key1) {
        for(let exchange of target1) {
            if(exchange.id == key1) {
              return new Proxy(exchange.pairs, {
                get(target2, key2) {
                  return target2[key2.replace('_','/').toUpperCase()]
                }
              });
            }
        }
        return Number.NaN;
      }
    });
    let $ = {};
    for(let exchange of state.exchanges) {
      prices[exchange.id] = new Proxy(exchange.pairs, {
        get(target, key) {
          return target[key.replace('_','/').toUpperCase()]
        }
      });
    }
    return $;
  }
}

const store = new Vuex.Store({
  state,
  mutations,
  getters
})

export default store
