<template>
  <div class="_introduction">
      <div class="subtitle">Bet, Track, Plan</div>
      <div class="comment std-font">Log in and access your unicorn cryptoboard</br>or just try out the app</div>
      <div class="buttons std-font first-row"><custombutton label="Log In" type="a" :click="$parent.login" textColor="#e0e0e0"/><custombutton label="Sign Up" type="a" :click="$parent.signup" textColor="#e0e0e0" /></div>
  </div>
</template>

<script>
import Icon from '../components/Icon'
import Custombutton from '../components/Custombutton'

export default {
  components: {
    Icon,
    Custombutton
  },
  data: () => ({
  })
}
</script>

<style scoped>
._introduction {
  width: 300px;
}
.subtitle {
  font-size: 12px;
  letter-spacing: -0.5px;
  margin-bottom: 30px;
  color: #FF057C;
}
.comment {
  display: none;
}
.buttons {
  justify-content: center;
  font-size: 20px;
  display: flex;
  width: 100%;
  margin-top: 30px;
}
.buttons > * {
  margin-right: 20px;
  margin-left: 20px;
}
.rectangle:active {
}

</style>
