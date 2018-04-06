<template>
  <div class="_indicator animated zoomIn" :class="contract.executed ? 'alldisabled' : ''">
    <div class="front">
      <div class="label">Code Contract</div>
      <div class="top">
        <div class="title roboto"><div class="name">{{contract.title}}</div></div>
        <div class="date roboto">({{distance}}) {{date}}</div>
      </div>
      <div class="code_wrap">
        <MonacoEditor
          height="200"
          class="code"
          language="javascript"
          :options="editor.options"
          :code="contract.code">
        </MonacoEditor>
      </div>
      <div class="betsarea">
        <div class="label">Bets</div>
        <div class="list" v-for="participation in contract.participations" :key="participation._id">
          <div class="user">{{participation[0].author_id}}</div>
          <div class="amount">{{participation[0].amount}} unicorns</div>
        </div>
      </div>
      <div class="betarea" v-if="!contract.executed">
        <div class="label">Your Bet</div>
        <div class="betinput">
          <input class="roboto" ref="answer" placeholder="your answer bet here"/>
          <div class="push pointer" @click="bet(1)">+1</div>
          <div class="push pointer" @click="bet(100)">+100</div>
          <div class="push pointer" @click="bet(1000)">+1000</div>
          <div class="push custom"><input placeholder="custom" v-model="customamount"/><div class="custompush pointer" @click="bet(customamount)">OK</div></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import '../assets/css/animate.css'
import MonacoEditor from 'vue-monaco-editor'
import {$} from '../$'
import Moment from "moment"

export default {
  props: [
    "contract"
  ],
  components: {
    MonacoEditor
  },
  data: () => ({
    editor: {
      options: {
        selectOnLineNumbers: true,
        roundedSelection: false,
        readOnly: true,
        cursorStyle: 'line',
        automaticLayout: false,
        glyphMargin: false
      }
    },
    customamount: 0
  }),
  computed: {
    date() {
      return Moment(this.contract.ts_execution*1000).format('D MMM YY, HH:mm:ss');
    },
    distance() {
      return Moment(this.contract.ts_execution*1000).fromNow();
    }
  },
  methods: {
    bet(amount) {
      let data = {
        contract_id: this.contract._id,
        answer: this.$refs.answer.value,
        amount: amount
      }
      fetch(this.$store.state.ENDPOINT + "contract/participation", {
          method: 'POST',
          headers: new Headers({
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.$store.state.session.token
          }),
          body: JSON.stringify(data)
      })
      .then(response => {
        console.log("Participation: " + response.status)
        if(response.status == 200) {
          return;
        }
        alert("Could not participate: " + response.status)
      })
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
  margin-top: -1px;
}
.betsarea {
  padding: 10px;
  background-color: #111;
  margin-top: -3px;
  border-radius: 3px;
  border: thin solid #222;
}
.betsarea .list {
  display: flex;
}
.betarea {
  padding: 10px;
  background-color: #111;
  margin-top: -3px;
  border-radius: 3px;
  border: thin solid #222;
}
.betinput {
  display: flex;
  margin-top: 10px;
  height: 29px;
}
.betinput > *:not(:last-child) {
  margin-right: 10px;
}
.push {
  padding: 6px 10px;
  border-radius: 3px;
  background-color: #FF057C;
  color: #000;
  float: left;
  margin-right: 10px;
}
 input {
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
  font-family: inherit;
}
.push.custom {
  display: flex;
  padding: 0;
  overflow: hidden;
  min-width: 30px;
}
.push:active {
  background-color: #d10065;
}
.push input {
  height: 18px;
  background-color: transparent;
  color: #000;
  margin-top: -2px;
  padding: 16px 10px;
  font-size: 12px;
  flex: 0 0 70%;
}
.custompush {
  padding: 6px 9px;
  flex: 0 0 30%;
  background-color: #b9005a;
}
.top {
  display: flex;
}
.top .title {
  flex: 0 0 50%;
}
.top .date {
  flex: 0 0 50%;
  margin-top: 10px;
  text-align: right;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
.alldisabled {
  pointer-events: none;
  opacity: 0.6;
}
.pointer {
  cursor: pointer;
}
.list {
  margin-top: 5px;
}
.list .amount {
  flex: 0 0 30%;
}
.list .user {
  flex: 0 0 70%;
}
</style>
