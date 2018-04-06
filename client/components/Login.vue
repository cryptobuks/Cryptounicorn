<template>
  <div class="_login">
    <div :class="wrong ? 'animated pulse' : ''">
      <div class="comment std-font"><br/><a @click="$parent.introduction" href="#">← Back</a></div>
      <form class="form std-font" action="" @submit="submit">
        <div class="inputs std-font"><input type="text" placeholder="Email" :value="email" ref="email"></div>
        <div class="inputs std-font"><input type="password" placeholder="Password" :value="password" ref="password"></div>
      <div class="comment std-font wrong" v-show="wrong">Your email/password combination is wrong</div>
        <div class="buttons std-font"><custombutton  textColor="#e0e0e0" themeColor="#FF057C" label="Log In" style="std-font" @click="submit" /></div>
      </form>
    </div>
  </div>
</template>

<script>
import base64 from "base-64"
import Icon from '../components/Icon'
import Custombutton from '../components/Custombutton'


export default {
  components: {
    Icon,
    Custombutton
  },
  props: [
    "email",
    "password"
  ],
  data: () => ({
    wrong: false
  }),
  methods: {
    test() {
      this.$store.commit("test");
    },
    setWrong() {
      this.wrong = true;
      setTimeout(() => this.wrong = false, 2000)
    },
    async submit() {
      let headers = new Headers();
      let data = {
        email: this.$refs.email.value,
        password: this.$refs.password.value
      }
      let response = await fetch(this.$store.state.ENDPOINT + "token", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
      })
      console.log(response)
      if(response.status == 403) {
        this.setWrong();
      }
      if(response.status == 200) {
        let body = await response.json()
        this.$store.commit("start", body.token)
        this.$router.push("/welcome")
      }
}
  }
}
</script>

<style scoped>
* {
  animation-duration: 0.2s;
  -webkit-animation-duration: 0.5s;
}
.form {
  font-size: 13px;
  width: 270px;
  margin-top: 30px;
  color: #e0e0e0;
}
.buttons,.inputs {
  display: flex;
  justify-content: space-around;
  font-size: 15px;
  width: auto;
  margin-top: 9px;
}
.buttons > *, .inputs > * {
  width: 99.5%;
}
.rectangle {
  background-color: #222 !important;
  border-color: #222 !important;
  color: #fff !important;
}
.wrong {
  margin-top: 15px;
  margin-bottom: 15px;
}
</style>
