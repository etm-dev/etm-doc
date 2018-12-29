<template>
  <div v-show="active">
    <h3 is="sui-header">Set IP-Address</h3>
    <div class="ui segment">
      <sui-form v-on:submit.prevent="submit">
        <sui-form-field>
          <label v-if="!$v.ip.$invalid">IP-Address</label>
          <label v-if="$v.ip.$invalid" style="color: rgb(219, 40, 40)">Incorrect IP-Address</label>
          <input :disabled="!active"
                 v-model="ip"
                 placeholder="ip-address"
                 :warning="$v.ip.$invalid"
                 :error="$v.ip.$invalid">
        </sui-form-field>

        <sui-form-field>
          <sui-button :disabled="!active || $v.ip.$invalid" @click="setIp">Add</sui-button>
        </sui-form-field>
      </sui-form>
    </div>
  </div>
</template>

<script>
import { required, ipAddress } from 'vuelidate/lib/validators'
import { create } from 'vue-modal-dialogs'
import questiondialog from '../modal/questiondialog'
const areYouSure = create(questiondialog)
export default {
  name: 'set-ip',
  computed: {
    active: function () {
      return this.$store.getters.registerStepTwo.active
    },
    ip: {
      get: function () {
        return this.$store.getters.registerIp
      },
      set: function (newIp) {
        this.$store.commit('setRegisterIp', { ip: newIp })
      }
    }
  },
  methods: {
    submit: function () {
    },
    setIp: async function () {
      let currentAddress = this.$store.getters.registerDomain
      let answer = await areYouSure({
        title: 'Confirm',
        content: `Do you really want to set the IP-Address <b>${this.ip}</b> for the domain of <b>${currentAddress}</b> ?<br/>This operation costs <b>0.1 XAS</b>.`,
        yes: 'Yes',
        no: 'No'
      })
      if (answer === 'Yes') {
        let that = this
        let result = await this.$store.dispatch('setIp', { that, domain: currentAddress, ip: this.ip })

        if (result.success && result.success === true) {
          this.$noty.success(`<b>Successfully set ip ${this.ip} for domain ${this.address}</b>`)
          this.ipAddress = ''
          this.address = ''

          this.$store.commit('setRegisterStepTwoFinished')
        } else {
          this.$noty.error(result.error)
        }
      }
    }
  },
  validations: {
    ip: {
      required,
      ipAddress
    }
  }
}
</script>
