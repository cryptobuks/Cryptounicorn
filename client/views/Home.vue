<template>
  <div class="_home">
    <div class="center animated zoomIn" ref="center">
      <div class="icon">
        <icon></icon>
      </div>
      <h1 class="title">CryptoUnicorn</h1>
      <introduction v-if="state == 'introduction'" class="animated fadeIn"/>
      <login v-if="state == 'login'" class="animated fadeIn" :email="fields.email" :password="fields.password" />
      <signup v-if="state == 'signup'" class="animated fadeIn"/>
    </div>
  </div>
</template>

<script>
import '../assets/css/animate.css'
import "../assets/css/flexboxgrid.min"
import "../assets/css/cryptofont.min.css"
import smoothHeight from 'vue-smooth-height'
import Icon from '../components/Icon'
import Introduction from '../components/Introduction'
import Login from '../components/Login'
import Signup from '../components/Signup'

export default {
  mixins:[smoothHeight],
  components: {
    Icon,
    Introduction,
    Login,
    Signup
  },
  data: () => ({
    state: "introduction",
    fields: {
      email: '',
      password: ''
    }
  }),
  beforeRouteLeave (to, from, next) {
    setTimeout(next, 270);
  },
  mounted() {
    this.$registerElement({
      el: this.$refs.center,
    })
  },
  methods: {
    introduction() {
      console.log("screen:introduction");
      this.state = "introduction";
    },
    login(...args) {
      console.log("screen:login");
      this.state = "login";
      if(args.length == 3) {
        this.fields.email = args[1]
        this.fields.password = args[2]
      }
    },
    signup() {
      console.log("screen:signup");
      this.state = "signup";
    },
    test() {
      this.$store.commit("setTestSession");
      console.log("mode:test");
    }
  }
}
</script>

<style>
* {
  transition-duration: 0.2s;
  -webkit-transition-duration: 0.2s;
}
.heightTransition-enter-active,
.heightTransition-leave-active {
  transition: all 0.2s;
  max-height: 500px;
}
.heightTransition-enter,
.heightTransition-leave-to
{
  opacity: 0;
  max-height: 0px;
}
._home {
  width: 100vw;
  color: #fff;
  -webkit-app-region: drag;
  user-select: none;
  display: flex;
  justify-content: center;
  height: 100%;
}
.title {
font-size: 30px;
font-weight: 400;
letter-spacing: 1px;
}
.center {
  align-self: center;
  text-align: center;
  margin-top: -70px;
  max-width: 295px
}
.icon {
  height: 85px;
}
.icon svg {
  width: 120px;
  height: 70px;
  border: none !important;
}
h1 {
  font-weight: normal;
  font-size: 20px;
  margin-top: 0px;
  margin-bottom: 5px;
  color: #FF057C;
  /*text-shadow: 0 1px 0 #111;*/

}
._home > * {
  animation-duration: 0.5s;
  animation-delay: 0.5s;
}
.comment {
  font-size: 13px;
  width: 100%;
  margin-bottom: 20px;
  color: #e0e0e0;
}
input[type="text"],input[type="password"],input[type="email"] {
  border: none;
  padding: 8px 10px;
  -webkit-appearance: none;
  font-size: 14px;
  outline: none;
  border-radius: 2px;
  border-bottom: thin solid #333;
  color: #e0e0e0;
  background-color: transparent;
  height: 40px;
}
input[type="text"]:active,input[type="password"]:active,input[type="email"]:active
{
  transform: scale3d(0.98, 0.98, 1);
  -webkit-transform: scale3d(0.98, 0.98, 1);
}
</style>
