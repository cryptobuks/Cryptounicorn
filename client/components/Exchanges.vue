<template>
  <div class="_">
    <exchange v-for="exchange of exchanges" v-bind:key="exchange.id" v-bind:api="exchange.api" />
  </div>
</template>

<script>
import Exchange from 'components/Exchange'
import { mapGetters } from 'vuex'

export default {
  components: {
    Exchange
  },
  computed: {
    ...mapGetters({
      exchanges: 'getExchanges'
    })
  }
}
</script>

<style scoped>
._ {
  position: relative;
}
</style>
