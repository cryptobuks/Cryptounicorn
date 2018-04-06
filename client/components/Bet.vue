<template>
  <div class="_indicator animated fadeIn">
    <div class="front">
      <div class="label">Code Bet</div>
      <div class="title roboto"><div class="name">Will be triggered on 1st May 23:30:00 UTC</div></div>
      <div class="code_wrap">
      </div>
      <div class="betarea">
          <div class="buttons">
        <div class="push">+1</div>
        <div class="push">+100</div>
        <div class="push">+1000</div>
        </div>
        <div class="inputarea">
          <input class="roboto" value="" placeholder="your answer bet here"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import '../assets/css/animate.css'
import MonacoEditor from 'vue-monaco-editor'
import {$} from '../$'

export default {
  props: [
    "id",
    "name",
    "formula"
  ],
  components: {
    MonacoEditor
  },
  data: () => ({
    code: "() => {\n\t\n}"
  }),
  methods: {
    edit() {
    },
    calc() {
    },
    destroy() {
    }
  },
  mounted() {
  }
}
</script>

<style scoped>
* {
  box-sizing: border-box;
}
._indicator {
  color: #999;
  margin-bottom: 13px;
  animation-duration: 0.25s;
  animation-delay: 1s;
  margin-bottom: 50px;
}
@media screen and (min-width: 768px) {
  ._indicator {
  }
}
.title {
  color: #FF057C;
  padding: 8px 0 15px 0;
  border-bottom: none;
  letter-spacing: 0px;
  display: flex;
  font-size: 13px;
  justify-content: space-between;
  border-bottom: 1px solid #222222;
}
.label {
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  color: #999;
}
.code {
  height: 300px;
}
.code_wrap {
  border-radius: 3px;
  overflow: hidden;
}
.betarea {
  margin-top: 15px;
  display: flex;
}
.betarea > * {
  flex: 0 0 50%;
}
.push {
  padding: 6px 10px;
  margin-top: 5px;
  border-radius: 3px;
  background-color: #FF057C;
  color: #000;
  float: left;
  margin-right: 10px;
}
.inputarea {
  margin-top: 5px;
  text-align: right;
}
.inputarea input {
  color: #e0e0e0;
  -webkit-appearance: none;
  outline: none;
  font-size: 13px;
  width: 100%;
  border-radius: 3px;
  height: 28.5px;
  padding: 5px 10px;
  border: none;
  background-color: #333;
}
</style>
