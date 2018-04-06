<template>
  <div class="_indicator" :class="disabled ? 'alldisabled animated zoomOutUp' : ''">
    <div class="front">
      <div class="top"><div class="label">New Code Contract</div><div class="label pointer" @click="close">x Discard</div></div>
      <div class="title roboto"><div class="name" contenteditable="true">Title of your code</div></div>
      <div class="code_wrap">
        <MonacoEditor
          height="200"
          class="code"
          language="javascript"
          :code="initialcode"
          @codeChange="onCodeChange">
        </MonacoEditor>
        <div class="runarea">
          <div class="label">Run Result</div>
          <div class="result">{{runresult}}</div>
          <div class="error">{{err}}</div>
        </div>
      </div>
      <div class="confirmarea">
        <div class="left">
      <div class="label">Contract execution date</div>
          <input id="datetime" name="date" v-model="date" type="datetime-local" step="1">
        </div>
        <div class="right">
          <div class="push" @click="deploy" :disabled="deploying" :class="deploying ? 'disabled' : ''">{{deploylabel}}</div>
          <div class="push" @click="run">Run Code</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import '../assets/css/animate.css'
import MonacoEditor from 'vue-monaco-editor'
import Moment from "moment"
import {$} from '../$'

export default {
  props: [
    "id"
  ],
  components: {
    MonacoEditor
  },
  data: () => ({
    initialcode: "() => {\n\t\n}",
    code: "",
    runresult: "",
    err: "",
    date: Moment().add(1, 'minutes').format("YYYY-MM-DD[T]HH:mm:ss"),
    deploylabel: "Deploy Code & Enable Contract",
    deploying: false,
    disabled: false
  }),
  methods: {
    test() {
      try {
        let fn = new Function("return (" + this.code + ")()");
        console.log("Test", fn());
        return true
      }
      catch(err) {
        return false
      }
    },
    run() {
      this.err = "";
      try {
        let fn = new Function("return (" + this.code + ")()");
        this.runresult = fn();
      }
      catch(err) {
        console.log(err.message);
        this.err = "(!) " + err.message;
      }
    },
    deploy() {
      this.deploying = true;
      if(!this.test()) {
        this.runresult = "Your code has error. Fix them prior to deployment.";
        return;
      }

      let data = {
        code: this.code,
        ts_execution: Moment(this.ts_execution).unix()
      }
      fetch(this.$store.state.ENDPOINT + "contract", {
          method: 'POST',
          headers: new Headers({
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.$store.state.session.token
          }),
          body: JSON.stringify(data)
      })
      .then(response => {
        if(response.status == 200) {
          this.deploylabel = "Code deployed.";
          this.disabled = true;
          setTimeout(() => this.close(), 2000)
          return;
        }
        this.deploylabel = "Contract not deployed (" + response.status + ")";
      })
    },
    close() {
      this.$parent.removeNew(this.id);
    },
    onCodeChange(editor) {
      this.code = editor.getValue();
      if(this.deploying) {
        this.deploying = false
      }
      if(this.err != "") { 
        this.err = ""
      }
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
.name {
  -webkit-appearance: none;
  outline: none;
}
.name:focus, .name:active {
  font-weight: bold;
}
.code {
  height: 300px;
}
.code_wrap {
  border-radius: 3px;
  overflow: hidden;
}
.confirmarea {
  margin-top: 12px;
  display: flex;
}
.confirmarea * {
  flex: 0 0 50%;
}
.confirmarea .right {
  margin-top: 14px;
  flex: 0 0 50%;
}
.push {
  padding: 6px 10px;
  margin-top: 5px;
  margin-left: 10px;
  border-radius: 3px;
  background-color: #FF057C;
  color: #000;
  float: right;
  cursor: pointer;
}
.push:active {
  background-color: #d10065;
}
.disabled.push {
  background-color: #555;
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
input[type="datetime-local"] {
  -webkit-appearance: none;
  margin-top: 5px;
  outline: none;
  border: none;
  padding: 5px;
  border-radius: 3px;
  font-size: 13px;
  height: 28.5px;
  background-color: #333;
  color: #a0a0a0;
}
.runarea {
  border: thin solid #222;
  padding: 15px;
}
.runarea .result {
  margin-top: 15px;
  color: #FF057C;
}
.alldisabled {
  pointer-events:none;
  opacity: 0.7;
}
.top {
  display: flex;
}
.top > * {
  flex: 0 0 50%;
}
.top > *:nth-child(2) {
  text-align: right;
}
.pointer {
  cursor: pointer;
}
</style>