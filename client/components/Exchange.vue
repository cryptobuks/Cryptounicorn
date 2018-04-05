<template>
  <div class="_exchange animated fadeIn">
    <div class="title"><div class="name">{{ this.api.id }}</div><div class="window_options"><div class="window_option status">{{last != null ? ((last <= this.rateLimit*3) ? 'Synced' : last/1000 + 's') : 'SYNCING'}}</div><div class="window_option hide" @click="() => show.pairs = !show.pairs">{{show.pairs ? "Hide" : "Show"}}</div><div class="window_option close" @click="destroy">✕</div></div></div>
    <div v-if="show.pairs">
      <div class="menu">
        <div class="active">ALL</div>
        <div>SELECTION</div>
        <div>+</div>
      </div>
      <div class="pairs row">
        <div class="pair col-lg-4 col-md-6 col-sm-4 col-xs-4 row row--no-gutter" v-for="(data, currency, i) in pairs" v-bind:key="currency">
          <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12 col--no-gutter">{{currency.replace("/",".")}}</div>
          <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12 col--no-gutter" v-bind:style="{ color: (prepairs == null) ? '' : (prepairs[currency].last == data.last ? '' : (prepairs[currency].last < data.last ? 'green' : 'red')) }">
          <span>{{format(data.last)}}</span> <span class="cf" v-if="show.symbols" v-bind:class="'cf-' + currency.split('/')[1].toLowerCase()"></span>
          </div>
          <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12 col--no-gutter">▼ {{format(data.bid)}}</div>
          <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12 col--no-gutter">▲ {{format(data.ask)}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import '../assets/css/animate.css';
import { mapGetters } from 'vuex'

export default {
  props: [
    "api"
  ],
  data: () => ({
    pairs: null,
    prepairs: null,
    last: null,
    show: {
      pairs: true,
      symbols: false
    },
    rateLimit: 5000
  }),
  methods: {
    format(number) {
      if(number == undefined)
        return "";
      let u = Math.trunc(number);
      return u > 9 ? ((u > 9999) ? number.toFixed(0) : number.toFixed(2)) : number.toFixed(4);
    },
    destroy() {
      this.$el.classList.add("fadeOut");
      setTimeout(() => this.$store.commit('removeExchange', this.api.id), 1000);
    }
  },
  mounted() {
    setTimeout(() => this.$el.style.animationDelay = "0s", 1000);
    setTimeout(() => this.$el.classList.remove("zoomIn"), 1000);
    this.rateLimit = this.api.rateLimit;
    // Update Counter:
    setInterval(() => this.last += 1000, 1000);
    // Updates:
    let update = () => {
      this.api.fetchTickers().then((pairs) => {
          // replace previous pairs
          this.prepairs = this.pairs;
          // fill in pairs
          this.pairs = pairs;
          this.$store.commit('updatePairs', {
            id: this.api.id,
            pairs: pairs
          });
          // reset update counter
          this.last = 0;
          // timeout update
          setTimeout(update, this.rateLimit);
      }).catch(() => setTimeout(update, this.rateLimit))
    }
    update();
  }
}
</script>

<style scoped>
* {
  box-sizing: border-box;
}
._exchange {
  margin-bottom: 13px;
  overflow: hidden;
  animation-duration: 0.25s;
  animation-delay: 0.6s;
}
@media screen and (min-width: 768px) {
  ._exchange {
  }
}
.title {
  color: #FF057C;
  padding: 7px 16px;
  border-bottom: none;
  letter-spacing: 2px;
  text-transform: uppercase;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #222;
}
.title > div {
  width: 50%;
}
.title .name {
  font-size: 16px;
  padding: 2px 0;
  text-align: left;
}
.title .window_options {
  text-align: right;
  display: flex;
  justify-content: flex-end;
  padding-top: 7px;
  color: #666;
}
.title .window_option:not(:last-child) {
  padding-right: 15px;
}
.window_option,.close {
  font-size: 15px;
}
.window_option,.hide {
  font-size: 12px;
}
.title .window_option:hover {
  color: #e0e0e0;
}
.title .window_option:active {
  -webkit-transform: scale3d(0.95, 0.95, 1);
}
.status {
  color: #a0a0a0;
}
.pairs {
  background-color: transparent;
  font-size: 12px;
  color: #e0e0e0;
  letter-spacing: 0.2px;
  position: relative;
  width: 100%;
  margin: 15px 5px;
}
.pair {
  margin-bottom: 10px;
  padding-bottom: 10px;
}
.pair div {
  margin-bottom: 5px;
}
.cf {
  color: #999;
}
.pair div:nth-child(1) {
  color: #999;
  font-size: 14px;
  letter-spacing: 1px;
}
.pair div:nth-child(2) {
  color: #e0e0e0;
  font-size: 14px;
}
.pair div:nth-child(3) {
  color: #999;
}
.pair div:nth-child(4) {
  color: #999;
}
.menu * {
  padding: 10px 20px;
  height: 100%;
  font-size: 10px;
  letter-spacing: 2px;
  max-height: 35px;
}
.menu .active {
  font-weight: bold;
}
.menu {
  display: flex;
  color: #e0e0e0;
}
.loading {
  padding: 15px 0;
}
</style>
