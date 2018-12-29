<template>
  <div id="app">
    <dialogs-wrapper class="top-margin dialog-wrapper"
                     transition-name="fade"></dialogs-wrapper>
    <div class="ui fixed inverted menu">
      <div class="ui container">

        <div class="left menu">
          <router-link to="/">
            <img class="logo middle aligned" style="margin: 2px 0px -2px 0px;" height="40" src="/static/images/logo.png">
          </router-link>
          <router-link class="header item left"
                      to="/"
                      v-show="isLoggedIn">Home</router-link>
        </div>

        <div class="right menu" >
          <router-link class="header item"
                      to="/account" active-class="active"
                      v-show="isLoggedIn">Account</router-link>
          <router-link class="header item"
                      to="/login" active-class="active"
                      v-show="isNotLoggedIn">LOGIN</router-link>
          <router-link class="header item"
                      to="/logout" active-class="active"
                      v-show="isLoggedIn">LOGOUT</router-link>
          <a class="header item" href="http://wallet.entanmo.com" v-show="isNotLoggedIn">SIGN UP</a>
        </div>

      </div>
    </div>
    <transition name="fade" mode="out-in">
      <router-view class="top-margin"/>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'App',
  computed: {
    isNotLoggedIn: function () {
      return !this.$store.getters.isLoggedIn
    },
    isLoggedIn: function () {
      return this.$store.getters.isLoggedIn
    }
  }
}
</script>

<style>

@import 'normalize.css';
@import 'semantic-ui-css/semantic.min.css';
@import 'vuejs-noty/dist/vuejs-noty.css';

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.dialog-wrapper {
  z-index: 99;
  position: fixed;
}

.vert-centered {
  margin: 5px 0px;
}

.top-margin {
  margin-top: 40px;
  padding: 0% 5%;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s
}
.fade-enter, .fade-leave-active {
  opacity: 0
}
</style>
