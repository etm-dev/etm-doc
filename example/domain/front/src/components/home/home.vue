<template>
  <div class="container">
    <br/>
    <div class="extra" style="overflow:hidden">
      <router-link to="/register" class="ui right floated primary button">Register new domain</router-link>
    </div>
    <address-list @focus.native="$event.target.select()"></address-list>
  </div>
</template>

<script>
import addresslist from './addresslist'
export default {
  name: 'home',
  data: function () {
    return {
      currentAddress: ''
    }
  },
  computed: {
    isLoggedIn: function () {
      return this.$store.getters.isLoggedIn
    }
  },
  watch: {
    '$route': function () {
      if (this.$route.query && 'setIp' in this.$route.query) {
        this.currentAddress = this.$route.query.setIp
      }
    }
  },
  components: {
    'address-list': addresslist
  }
}
</script>

<style scoped>
.container {
  text-align: center;
  width: 100%;
}
</style>
