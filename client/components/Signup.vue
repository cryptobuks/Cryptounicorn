<template>
  <div class="_signup">
      <div class="comment std-font">To create a new account we just need</br>your name, email and a password</br></br><a @click="$parent.introduction" href="#">← Back</a></div>
      <form class="form std-font" action="" @submit="submit">
        <div class="inputs std-font"><input type="text" placeholder="Name" ref="name"></div>
        <div class="inputs std-font"><input type="email" placeholder="Email" ref="email"></div>
        <div class="inputs std-font"><input type="password" placeholder="Password" ref="password"></div>
        <div class="comment std-font wrong" v-show="wrong">Your email is already in use.</div>
        <div class="buttons std-font"><custombutton label="Sign Up Now" type="a" style="std-font" /></div>
      </form>
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
    wrong: false
  }),
  methods: {
    setWrong() {
      this.wrong = true;
      setTimeout(() => this.wrong = false, 2000)
    },
    submit() {
      let data = {
          name: this.$refs.name.value,
          email: this.$refs.email.value,
          password: this.$refs.password.value
        }
      fetch(this.$store.state.ENDPOINT + "account", {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
        .then(response => {
          if(response.status == 409) {
            this.setWrong()
          }
          if(response.status == 200) {
            this.$parent.login(null, this.$refs.email.value, this.$refs.password.value)
          }
        })
    }
  }
}
</script>

<style scoped>
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
.comment {
  margin-top: 20px;
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
