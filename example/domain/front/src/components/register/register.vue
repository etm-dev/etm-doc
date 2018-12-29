<template>
  <div>
    <br/>
    <div class="ui segment margin-top">
      <sui-step-group :steps="steps"></sui-step-group>
      <br/>
      <register-address></register-address>
      <br/>
      <set-ip></set-ip>
      <br/>
      <router-link to="/" class="ui button secondary">Back to Home</router-link>
    </div>
  </div>
</template>

<script>
import registeraddress from './registerAddress'
import setip from './setip'

export default {
  name: 'register',
  computed: {
    steps: function () {
      let step1 = this.$store.getters.registerStepOne
      let step2 = this.$store.getters.registerStepTwo
      return [step1, step2]
    }
  },
  components: {
    'register-address': registeraddress,
    'set-ip': setip
  },
  created: function () {
    if (this.$route.query && this.$route.query.domain && typeof this.$route.query.domain === 'string') {
      this.$store.commit('setRegisterStepOneFinished', { domain: this.$route.query.domain })
    }
  },
  beforeRouteLeave (to, from, next) {
    this.$store.commit('resetRegisterDomain')
    next()
  }
}
</script>

<style scoped>
.margin-top {
  margin-top: 40px;
}
</style>
