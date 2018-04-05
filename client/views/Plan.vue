<template>
  <div class="_board">
    <topbar></topbar>
    <sectionmenu :show="menu"/>
    <div class="content">
      <div class="row row--no-gutter row-exchanges">
        <exchanges class="exchanges col--no-gutter col-lg-6 col-md-6 col-sm-12 col-xs-12"></exchanges>
        <indicators class="indicators col--no-gutter col-lg-6 col-md-6 col-sm-12 col-xs-12"></indicators>
      </div>
    </div>
    <add></add>
  </div>
</template>

<script>
import "../assets/css/flexboxgrid.min"
import "../assets/css/cryptofont.min.css"
import Topbar from 'components/Topbar'
import Exchanges from 'components/Exchanges'
import Indicators from 'components/Indicators'
import Add from 'components/Add'
import Sectionmenu from 'components/SectionMenu'

export default {
  data: () => ({
    menu: false
  }),
  components: {
    Sectionmenu,
    Exchanges,
    Indicators,
    Topbar,
    Add
  },
  mounted() {
    if(this.$store.state.session.test == undefined)
      this.$router.push('/');
    this.$store.commit('reset');
    this.$store.commit('addExchange', 'cex');
    this.$store.commit('addIndicator', {
      name: "EXAMPLE",
      formula: "_.cex.btc_eur.last"
    });
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
}
.interpreter {
  display: none;
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
.row-exchanges {
  overflow: scroll;
}
@media screen and (min-width: 768px) {
  .exchanges {
  }
}
</style>
