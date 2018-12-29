<template>
  <div class="background">
    <sui-grid centered vertical-align="middle">
      <sui-grid-column>

        <h2 is="sui-header" image>
          <sui-image src="static/images/logo.png" style="width:141px;height:40px;" />
          <sui-header-content>Log-in to your account</sui-header-content>
        </h2>

        <sui-form v-on:submit.prevent="onSubmit">
          <sui-segment stacked>
            <sui-form-field>
              <label v-show="!$v.secret.$invalid" for="secret">Secret</label>
              <label style="color: rgb(219, 40, 40)"
                     v-show="$v.secret.$invalid">This Secret is not BIP39 complient</label>
              <sui-input
              id="secret"
              type="password"
              placeholder="Secret"
              icon="lock"
              icon-position="left"
              v-model="secret"
              :error="$v.secret.$invalid"
              readonly onfocus="this.removeAttribute('readonly');"/>
            </sui-form-field>
            <sui-button @click="login" size="large" fluid animated class="primary"
                        :disabled="$v.secret.$invalid">
              <sui-button-content visible>Login</sui-button-content>
              <sui-button-content hidden>
                <sui-image height="20px" class="centered" src="static/images/logo.png"/>
              </sui-button-content>
            </sui-button>
          </sui-segment>
        </sui-form>
        <sui-message>No entanmo account? <a href="https://wallet.entanmo.com">Create one</a></sui-message>
      </sui-grid-column>
    </sui-grid>
  </div>

</template>

<script>
import { required } from 'vuelidate/lib/validators'
import etmJS from 'etm-js'
import Mnemonic from 'bitcore-mnemonic'
export default {
  name: 'login',
  data: function () {
    return {
      secret: ''
    }
  },
  methods: {
    login: async function () {
      let that = this
      let secret = this.secret
      let result = await this.$store.dispatch('getUserInfo', { that, secret, etmJS })

      if (result.success && result.success === true) {
        this.$router.push('/')
      } else {
        this.$noty.error('Could not load user data')
      }
    },
    onSubmit: function () {
      console.log('trying to prevent on submit')
    }
  },
  validations: {
    secret: {
      required,
      isBip39: function (value) {
        return Mnemonic.isValid(this.secret)
      }
    }
  }
}
</script>

<style scoped>
 .background {
    height: 100vh;
    margin: 1em 0;
  }
  .grid {
    height: 100%;
  }
  .column {
    max-width: 450px;
    text-align: center !important;
  }
</style>
