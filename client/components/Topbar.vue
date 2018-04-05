<template>
  <div class="_wrap">
    <div class="_topbar">
      <div class="left">
        <div @click="$parent.openMenu"><icon /></div>
      </div>
      <div class="right std-font">
        <div class="text" v-if="$store.state.session.test && !mobile">You are not logged in. Your session will be lost.</div>
      </div>
    </div>
  </div>
</template>

<script>
import Icon from './Icon'
import Custombutton from '../components/Custombutton'


export default {
  props: [
    "mobile"
  ],
  components: {
    Icon,
    Custombutton
  },
  mounted() {
  }
}
</script>

<style scoped>
  @keyframes blink {
    to {
      opacity: 0.5;
    }
  }
  ._wrap {
    height: 85px;
  }
  ._topbar {
    width: 100vw;
    padding: 26px 16px 15px 15px;
    color: #fff;
    -webkit-app-8egion: drag;
    user-select: none;
    text-align: right;
    display: flex;
    position: fixed;
    height: 68px;
    top: 0;
    left: 0;
    z-index: 1;
    justify-content: space-between;
    background-color: inherit;
    color: #FF057C;
  }

  .right .rectangle:active {
    color: #222;
  }


  .right,.left {
    height: 100%;
  }
  .right,.right > div,.left,.left > div {
    display: flex;
    align-self: center;
  }
  .left {
    font-size: 17px;
    letter-spacing: -0.2px;
    color: #000;
    text-transform: initial;
    color: #FF057C;
    fill: #FF057C;
  }
  .left svg {
    width: 45px;
    padding: 5px;
    height: 45px;
    margin-top: 26px;
    vertical-align: middle;
  }
  .left span {
    padding-left: 10px;
  }
</style>
