<template>
  <div class="_bet">
    <topbar></topbar>
    <sectionmenu :show="menu"/>
    <div class="content">
      <bet v-for="contract in contracts" :key="contract._id" :contract="contract" class="bet"/>
      <newbet v-for="newBet in newBets" :key="newBet" :id="newBet" class="bet"/>
    </div>
    <addbet></addbet>
  </div>
</template>

<script>
import "../assets/css/flexboxgrid.min"
import "../assets/css/cryptofont.min.css"
import Topbar from 'components/Topbar'
import Newbet from 'components/Newbet'
import Bet from 'components/Bet'
import Addbet from 'components/Addbet'
import Sectionmenu from 'components/SectionMenu'
import Axios from "axios"

export default {
  data: () => ({
    menu: false,
    newBets: [],
    contracts: []
  }),
  components: {
    Sectionmenu,
    Bet,
    Newbet,
    Topbar,
    Addbet
  },
  mounted() {
    if(!this.$store.state.session)
      this.$router.push('/');
    setInterval(async () => {
      this.contracts = (await (await fetch(this.$store.state.ENDPOINT + "contract", {
        method: 'GET',
        headers: new Headers({
          'Authorization': 'Bearer ' + this.$store.state.session.token
        })
      }))
      .json())
      .contracts
    }, 2000)
  },
  methods: {
    openMenu() {
      this.menu = true;
    },
    closeMenu() {
      this.menu = false;
    },
    removeNew(v) {
      for(let i = 0; i < this.newBets.length; i++)
        if(this.newBets[i] == v) {
          this.newBets.splice(i, 1);
          break;
        }
    },
    addNew() {
      this.newBets.push(new Date().getTime())
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
  display: flex;
  flex-wrap: wrap;
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

.bet {
  width: 100%;
  padding: 0 20px;
}
@media screen and (min-width: 980px) {
  .bet {
    width: 50%;
  }
}
</style>
