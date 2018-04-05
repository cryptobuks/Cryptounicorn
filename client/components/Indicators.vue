<template>
  <div class="_indicators">
    <indicator v-for="indicator of indicators" :key="indicator.id" :id="indicator.id" :formula="indicator.formula" :name="indicator.name" />
  </div>
</template>

<script>
import Indicator from 'components/Indicator'
import { mapGetters } from 'vuex'

export default {
  components: {
    Indicator
  },
  computed: {
    ...mapGetters({
      indicators: 'getIndicators'
    })
  }
}
</script>

<style scoped>
._indicators {
  position: relative;
}
</style>
