<template>
  <button class="rectangle" v-bind:class="size" v-bind:style="{color: textColor, borderColor: themeColor, backgroundColor: themeColor ? themeColor : ''}">
    <router-link v-if="type == 'router-link'" v-bind:to="href" @click.native="click" event="mouseup">{{this.label}}</router-link>
    <a v-else-if="type == 'a'" v-bind:to="href" @click="click">{{this.label}}</a>
    <span v-else>{{this.label}}</span>
  </button>
</template>

<script>

export default {
  props: [
    "href",
    "click",
    "label",
    "type",
    "size",
    "textColor",
    "themeColor"
  ],
  mounted() {
    document.addEventListener('touchstart', () => true, {passive: true});
  }
}
</script>

<style scoped>
@keyframes blink {
  to {
    opacity: 0.5;
  }
}
.rectangle {
  all: unset;
  cursor: pointer;
  border-width: 1px;
  border-style: solid;
  background-color: inherit;
  border-color: none;
  color: #111;
  transition: all 0.1s;
  background-color: #111;
  border-color: #111;
  color: #fff;
}
.rectangle:not(.small) * {
  display: block;
  padding: 9px 0;
}
.rectangle.small * {
  display: block;
  padding: 0 10px;
}
.rectangle:active {
  transform: scale3d(0.95, 0.95, 1);
  -webkit-transform: scale3d(0.95, 0.95, 1);
}
.rectangle:not(:first-child) {
  margin-left: 10px;
}
.rectangle.error {
  animation: blink 1s infinite;
  background-color: #f00;
  border: thin solid #f00;
  color: #000;
}
</style>
