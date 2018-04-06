<template>
  <div class="_menu" :class="show ? '' : 'hide'">
    <div>
      <div class="icon" @click="$parent.closeMenu"><icon/></div>
      <div class="user">
        <div class="picture"><img src="https://avatars0.githubusercontent.com/u/4648330?s=460&v=4"/></div>
        <div class="details">
          <div class="name">{{details.name}} {{details.surname}}</div>
          <div class="data">{{details.unicorns}} Unicorns <div class="button">Buy</div> <div class="button">Sell</div></div>
          <div class="options">
            <div class="button"><router-link to="/" @click.native="signOff" event="mouseup">Sign Off</router-link></div>
          </div>
        </div>
      </div>
      <div class="section" v-for="section in sections" :key="section.url" :class="path == section.url ? 'active' : ''"><router-link :to="section.url">{{section.title}}</router-link></div>
      </div>
  </div>
</template>

<script>
import Icon from './Icon'

export default {
  components: {
    Icon
  },
  props: [
    "show"
  ],
  data: () => ({
    sections: [{
      title: '{} Code Contracts',
      url: '/bet'
    },
    {
      title: '♞ Cryptoplanning',
      url: '/plan'
    }]
  }),
  computed: {
    path() {
      return this.$route.path
    },
    details() {
      return this.$store.state.session.details
    }
  },
  methods: {
    signOff() {
      this.$store.commit("end")
    }
  },
  mounted() {
  }
}
</script>

<style scoped>
@media only screen and (max-width: 748px) {
  ._menu.hide {
    margin-left: -100%;
  }
}
._menu {
  transition: 0.5s all;
  -webkit-transition: 0.5s all;
  position: fixed;
  left: 0;
  top: 0;
  height: 100vh;
  width: 260px;
  background-color: #000;
  font-size: 13px;
  color: #b0b0b0;
  margin: 0;
  z-index: 2;
  overflow: hidden
}
.icon {
  margin-left: 20px;
  margin-bottom: -6px;
}
.icon svg {
  width: 35px;
  height: 35px;
  margin-top: 20px;
  vertical-align: middle;
}
.section {
  color: #888;
  padding: 10px 15px 10px 73px;
  border-top: #1e1e1e thin solid;
  font-size: 15px;
}
.section:hover {
  color: #FF057C;
}
.section.active {
  color: #FF057C;
}
.section:last-child {
  border-bottom: #1e1e1e thin solid;
}
.user {
  padding: 15px;
  display: flex;
}
.user .picture {
  overflow: hidden;
  border-radius: 100px;
  height: 43px;
  width: auto;
}
.user .picture img {
  height: 100%;
}
.user .details {
  margin-left: 15px;
  align-self: center;
}
.user .details .data {
  font-size: 80%;
  color: #888;
}
.user .details .button {
  border-bottom: thin solid #444;
  padding-bottom: 1px;
  display: inline
}
.user .details .options {
  font-size: 80%;
  margin-top: 10px;
}
</style>
