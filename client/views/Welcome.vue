<template>
  <div class="_board">
    <topbar></topbar>
    <sectionmenu :show="menu"/>
    <div class="content">
      <div class="title">Welcome Back&nbsp;<b>{{details.name}}</b></div>
      <div class="credit">Your current credit amounts to <span><b>{{details.unicorns}}</b> unicorns</span></div>
    </div>
  </div>
</template>

<script>
import "../assets/css/flexboxgrid.min"
import "../assets/css/cryptofont.min.css"
import Topbar from 'components/Topbar'
import Sectionmenu from 'components/SectionMenu'

export default {
  data: () => ({
    menu: false
  }),
  components: {
    Sectionmenu,
    Topbar
  },
  computed: {
    details() {
      return this.$store.state.session.details
    }
  },
  mounted() {
    if(!this.$store.state.session)
      this.$router.push('/');
  },
  methods: {
    openMenu() {
      this.menu = true;
    },
    closeMenu() {
      this.menu = false;
    }
  }
}
</script>

<style scoped>
@media only screen and (min-width: 748px) {
  .content {
    margin-left: 260px;
  }
}
.content {
  padding-left: 50px;
}
.title {
  font-size: 60px;
  color: #e0e0e0;
  font-weight: lighter;
}
.credit {
  font-size: 20px;
  color: #999;
  font-weight: lighter;
  margin-top: 15px;
}
.credit span {
  color: #FF057C;
}
.menu {
  background-color: #000;
  padding-left: 22px;
  padding-top: 5px;
}
.menu > div {
  font-size: 12px;
  font-weight: bold;
  color: #888;
  display: inline-block;
  margin-right: 10px;
  padding-bottom: 15px;
  text-transform: uppercase;
  letter-spacing: 1px;
}
</style>
