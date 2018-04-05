<template>
  <div class="_indicator animated fadeIn">
    <div class="front">
      <div class="title roboto"><div class="name" contenteditable="true" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false">{{name}}</div><div class="window_options"><div class="window_option edit"  v-if="show.value" v-bind:class="show.edit ? 'open' : ''" @click="edit">{{show.edit ? "Done" : "Edit"}}</div><div class="window_option hide" @click="() => show.value = !show.value">{{show.value ? "Hide" : "Show"}}</div><div class="window_option close" @click="destroy">✕</div></div></div>
      <div class="value" v-if="show.value && !show.edit" @click="calc" v-bind:style="{ color: (prevalue == null) ? '' : (prevalue == value ? '' : (prevalue < value ? 'green' : 'red')) }">{{value}}</div>
      <div class="label" v-if="show.value && show.edit">Formula</div>
      <div class="formula" v-show="show.value && show.edit" contenteditable="true" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" ref="formula"></div>
    </div>
  </div>
</template>

<script>
import '../assets/css/animate.css';
import {$} from '../$'

export default {
  props: [
    "id",
    "name",
    "formula"
  ],
  data: () => ({
    show: {
      value: true,
      edit: false
    },
    prevalue: null,
    value: ""
  }),
  methods: {
    edit() {
      if(this.show.edit) {
        this.formula = this.$refs.formula.innerText;
        try {
          this.calc();
          this.$store.commit('updateIndicator', {
            id: this.id,
            name: this.name,
            formula: this.$refs.formula.innerText
          });
        }
        catch(exception) {
          console.log(exception);
        }
      }
      else {
        this.$refs.formula.innerText = this.formula;
      }
     this.show.edit = !this.show.edit;
    },
    calc() {
      let f = new Function('_', 'let result = (' + this.formula + '); return result;');
      this.prevalue = this.value;
      this.value = f(this.$store.getters.get_);
    },
    destroy() {
      this.$el.classList.add("fadeOut");
      setTimeout(() => this.$store.commit('removeIndicator', this.id), 1000);
    }
  },
  mounted() {
    console.log(this.id + ":mounted");
    $.$on('pairs:updates', () => {
      if(this.formula != "")
        this.calc();
    });
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
}
@media screen and (min-width: 768px) {
  ._indicator {
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
  border-bottom: 1px solid #222222;
}
.title .name {
  font-size: 16px;
  text-transform: uppercase;
  letter-spacing: 2px;
  padding: 2px 0;
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
.value {
  font-weight: 300;
  color: #e0e0e0;
}
.formula {
  font-weight: normal;
  color: #FF057C;
}
.value,.formula {
  letter-spacing: 0.2px;
}
.value {
  font-size: 45px;
  text-transform: uppercase;
  padding: 10px 15px 15px 15px;
  line-height: 60px;
}
.formula {
  font-size: 14px;
  padding: 3px 15px 5px 15px;
  height: 62px;
}
.label {
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  color: #999;
  padding: 8px 15px 2px 15px;
}
[contenteditable="true"] {
  outline: none;
}
</style>
