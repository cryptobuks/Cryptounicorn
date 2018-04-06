<template>
  <div class="_signup">
      <div class="comment std-font">To create a new account we just need</br>your name, email and a password</br></br><a @click="$parent.introduction" href="#">← Back</a></div>
      <form class="form std-font" action="" @submit="submit">
        <picture-input 
          ref="pictureInput" 
          @change="onChange" 
          width="150" 
          height="150" 
          margin="16" 
          class="image"
          accept="image/jpeg,image/png" 
          size="10" 
          :removable="true"
          :customStrings="{
            upload: '<h1>Bummer!</h1>',
            drag: '<b>Select profile pic</b><br/>Drag any image'
          }">
        </picture-input>
        <div class="inputs std-font"><input type="text" placeholder="Name" ref="name"></div>
        <div class="inputs std-font"><input type="text" placeholder="Surname" ref="surname"></div>
        <div class="inputs std-font"><input type="text" placeholder="Phone" ref="phone"></div>
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
import PictureInput from 'vue-picture-input'

export default {
  components: {
    Icon,
    Custombutton,
    PictureInput
  },
  data: () => ({
    wrong: false,
    image: null
  }),
  methods: {
    setWrong() {
      this.wrong = true;
      setTimeout(() => this.wrong = false, 2000)
    },
    submit() {
      let data = {
          name: this.$refs.name.value,
          surname: this.$refs.surname.value,
          phone: this.$refs.phone.value,
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
    },
    onChange() {
      console.log('New picture selected!')
      if (this.$refs.pictureInput.image) {
        this.image = this.$refs.pictureInput.image
        console.log('Picture loaded.')
      } else {
        console.log('FileReader API not supported: use the <form>, Luke!')
      }
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
<style>
.image button {
  border: none;
  background: transparent;
  color: #e0e0e0;
  font-family: inherit;
  -webkit-appearance: none;
  outline: none;
}
.image .picture-preview {
  border-radius: 100px;
}
.image .preview-container {
  margin-bottom: 10px;
}
</style>