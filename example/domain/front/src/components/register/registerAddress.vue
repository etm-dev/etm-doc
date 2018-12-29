<template>
  <div v-show="active">
    <h3 is="sui-header">Register Address</h3>
    <div class="ui segment">
      <sui-form v-on:submit.prevent="submit">
        <sui-form-field>
          <label v-if="!$v.domain.$invalid">Address</label>
          <label v-if="$v.domain.$invalid" style="color: rgb(219, 40, 40)" >Incorrect URL</label>
          <sui-input placeholder="address"
                    v-model="domain"
                    :disabled="!active"
                    :error="$v.domain.$invalid"
                    :warning="$v.domain.$invalid"></sui-input>
        </sui-form-field>
        <sui-form-field>
          <sui-button :disabled="!active || $v.domain.$invalid" @click="register">Add</sui-button>
        </sui-form-field>
      </sui-form>
    </div>
  </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
import { create } from 'vue-modal-dialogs'
import questionDialog from '../modal/questiondialog'

const areYouSure = create(questionDialog)

export default {
  name: 'register-address',
  computed: {
    active: function () {
      return this.$store.getters.registerStepOne.active
    },
    domain: {
      get: function () {
        return this.$store.getters.registerDomain
      },
      set: function (dom) {
        this.$store.commit('setRegisterDomain', { domain: dom })
      }
    }
  },
  methods: {
    submit: function () {
    },
    register: async function () {
      let answer = await areYouSure({
        title: 'Confirm',
        content: `Do you really want to register the domain <b>${this.domain}</b> ?<br/>This operation costs <b>0.1 XAS.</b>`,
        yes: 'Yes',
        no: 'No'
      })
      if (answer === 'Yes') {
        let that = this
        let result = await this.$store.dispatch('registerDomain', { that, domain: this.domain })
        if (result.success && result.success === true) {
          this.$noty.success(`<b>Domain ${this.domain} successfully registered!</b>`)
          this.$store.commit('setRegisterStepOneFinished', { domain: this.domain })
        } else {
          this.$noty.error(`<b>Registration of ${this.domain} failed.</b>`)
        }
      }
    }
  },
  validations: {
    domain: {
      required,
      url: function (value) {
        // eslint-disable-next-line
        var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi
        var regex = new RegExp(expression)
        return regex.test(value)
      }
    }
  }
}
</script>
