<template>
  <div class="_" v-click-outside="hide">
    <div class="main_button" @click="toggle('all')" v-bind:class="opened.all ? 'opened' : ''">
      <div class="label" v-bind:style="{visibility: !opened.all ? 'visible' : 'hidden', opacity: !opened.all ? '1' : '0'}">+</div>
      <div class="main" v-bind:style="{visibility: opened.all ? 'visible' : 'hidden', opacity: opened.all ? '1' : '0'}">
        <div class="_button" @click="addBet">Contract</div>
        <div class="_button">✕</div>
      </div>
    </div>
  </div>
</template>

<script>
import '../assets/css/animate.css';
import ClickOutside from 'vue-click-outside'
let ccxt = require("ccxt");

export default {
  data: () => ({
    opened: {
      all: false
    }
  }),
  methods: {
    toggle: function(what) {
      this.opened[what] = !this.opened[what];
      console.log(what,this.opened[what]);
    },
    hide: function() {
      for(let x in this.opened)
        this.opened[x] = false;
    },
    addBet() {
      this.$parent.addNew();
    }
  },
  mounted() {
  },
  directives: {
    ClickOutside
  }
}
</script>

<style scoped>
._ {
  user-select: none;
  position: fixed;
  bottom: 12px;
  right: 12px;
}
.main_button {
  font-size: 30px;
  height: 55px;
  width: 55px;
  line-height: 30px;
  background-color: #FF057C;
  border-radius: 30px;
  color: #111;
  -webkit-appearance: none;
  -webkit-outline: none;
  outline: none;
  transition: all 1s ease-in;
  -webkit-transition: all 1s ease-in;
  overflow: hidden;
  position: relative;
  font-weight: 300;
}
.main_button > div {
  position: absolute;
  top: 0;
  left: 0;
}
.main_button,.main_button > div {
  transition: all 0.1s ease-in;
  transition-delay: 0.1s;
  -webkit-transition-delay: 0.1s;
  -webkit-transition: all 0.1s ease-in;
}
.main_button.opened {
  padding: 0;
  height: 93px;
  width: 150px;
  border-radius: 10px;
}
.main_button:not(.opened):active {
  -webkit-transform: scale3d(0.95, 0.95, 1);
}
[class$="_button"] {
  cursor: pointer;
  float: right;
}
.main_button .label {
  padding: 12px 18px;
}
.main {
  width: 100%;
}
.main div {
  font-size: 15px;
  width: 100%;
  padding: 8px 18px;
  line-height: 30px;
  color: #111;
  -webkit-appearance: none;
  -webkit-outline: none;
  outline: none;
}
.main div:last-child {
  background-color: rgba(0,0,0,0.3);
  text-align: right;
}
.main div:active {
  background-color: rgba(0,0,0,0.3);
}
.main div:not(:last-child) {
  border-bottom: thin solid #111;
}
[class$="_add"] {
  position: relative;
  background-color: #000;
  margin-bottom: 8px;
  padding: 30px;
  color: #fff;
}
[class$="_add"] .title {
  margin-bottom: 5px;
}
[class$="_add"] .subtitle {
  font-size: 80%;
  margin-bottom: 15px;
}
select {
  border: none;
  padding: 8px 10px;
  -webkit-appearance: none;
  outline: none;
  border-radius: 2px;
  font-family: inherit;
  background-color: #555;
  height: 30px;
}
input[type="button"] {
  border: none;
  padding: 8px 10px;
  -webkit-appearance: none;
  outline: none;
  border-radius: 2px;
  font-family: inherit;
  background-color: #555;
  height: 30px;
  color: #000;
  cursor: pointer;
}
</style>
