<template>

  <div>
    <br/>
    <div class="ui segment">

      <sui-form v-on:submit.prevent="submit">
        <sui-form-field>
          <label>Sender</label>
          <sui-input disabled
                     class="ui inverted"
                     :value="ownAddress"></sui-input>
        </sui-form-field>

        <sui-form-field>
          <label v-show="!$v.recipientAddress.$invalid">Recipient</label>
          <label v-show="$v.recipientAddress.$invalid" style="color: rgb(219, 40, 40)">Invalid recipient address</label>
          <sui-input placeholder="address"
                     class="ui inverted"
                     v-model="recipientAddress"
                     :error="$v.recipientAddress.$invalid"
                     :warning="$v.recipientAddress.$invalid"></sui-input>
        </sui-form-field>

        <sui-form-field>
          <label v-show="!$v.selectedCoin.$invalid">Currency</label>
          <label v-show="$v.selectedCoin.$invalid"
                 style="color: rgb(219, 40, 40)">Invalid currency</label>
          <sui-dropdown class="labeled icon inverted"
                        icon="currency"
                        placeholder="currency"
                        button
                        selection
                        v-model="selectedCoin"
                        :options="availableCoins" />
        </sui-form-field>

        <br/>
        <sui-form-field>
          <div class="ui labeled input" style="width: 100%;">
            <div class="ui label">
              <p v-if="!selectedCoin">COIN</p>
              <p v-else>{{selectedCoin}}</p>
            </div>
            <sui-input type="number" step="any" min="0"
                      v-model="amount"
                      placeholder="amount"
                      :disabled="$v.selectedCoin.$invalid"
                      :error="$v.amount.$invalid"></sui-input>
          </div>
        </sui-form-field>

        <br/>

        <sui-form-field>
          <sui-button @click="inTransfer"
                      class="ui button primary"
                      :disabled="$v.$invalid">Transfer</sui-button>
        </sui-form-field>

      </sui-form>

      <br/>

    </div>

    <div class="ui segment">
      <h4>Transfers</h4>
      <sui-table celled padded>
        <sui-table-header>
          <sui-table-row>
            <sui-table-header-cell single-line>ID</sui-table-header-cell>
            <sui-table-header-cell>Sender</sui-table-header-cell>
            <sui-table-header-cell>Recipient</sui-table-header-cell>
            <sui-table-header-cell>Amount</sui-table-header-cell>
            <sui-table-header-cell>Time</sui-table-header-cell>
            <sui-table-header-cell>coin</sui-table-header-cell>
          </sui-table-row>
        </sui-table-header>

        <sui-table-body>
          <sui-table-row v-for="transfer in transfers" :key="transfer.tid">
            <sui-table-cell>
              <p v-tooltip.top="transfer.tid">
                {{transfer.tid | truncate(10,'...')}}
              </p>
            </sui-table-cell>
            <sui-table-cell>
              <p v-tooltip.top="'own address'" v-if="transfer.senderId === ownAddress" class="primary-color">
                {{transfer.senderId | truncate(17, '...')}}
              </p>
              <p v-else>{{transfer.senderId | truncate(17, '...')}}</p>
            </sui-table-cell>
            <sui-table-cell>
              <p v-tooltip.top="'own address'" v-if="transfer.recipientId === ownAddress" class="primary-color">
              {{transfer.recipientId | truncate(17, '...')}}
              </p>
              <p v-else>{{transfer.recipientId | truncate(17, '...')}}</p>
            </sui-table-cell>
            <sui-table-cell>{{transfer.amount / 1e8}}</sui-table-cell>
            <sui-table-cell>{{transfer.t_timestamp }}</sui-table-cell>
            <sui-table-cell>{{transfer.currency}}</sui-table-cell>
          </sui-table-row>
        </sui-table-body>
      </sui-table>

    </div>

  </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
import etmJS from 'etm-js'
import { create } from 'vue-modal-dialogs'
import questiondialog from '../modal/questiondialog'

const areYouSure = create(questiondialog)

export default {
  name: 'transfer',
  data: function () {
    return {
      recipientAddress: '',
      amount: '',
      selectedCoin: '',
      transfers: [
        {
          tid: '',
          senderId: '',
          recipientId: '',
          amount: '',
          t_timestamp: '',
          currency: ''
        }
      ]
    }
  },
  computed: {
    availableCoins: function () {
      return this.$store.getters.ownTransferableCoins
    },
    ownAddress: function () {
      return this.$store.getters.address
    }
  },
  methods: {
    inTransfer: async function () {
      let answer = await areYouSure({
        title: 'Confirm',
        content: `Do you really want to transfer <b>${this.amount} ${this.selectedCoin}</b> to <b>${this.recipientAddress}</b> ?<br/><b>This operation costs 0.1 ${this.selectedCoin}.</b>`,
        yes: 'Yes',
        no: 'No'
      })

      if (answer === 'Yes') {
        let that = this
        let result = await this.$store.dispatch('inTransfer', { that: that, etmJS, recipientAddress: this.recipientAddress, selectedCoin: this.selectedCoin, amount: this.amount })

        if (result.success && result.success === true) {
          this.$noty.success(`<b>Dapp transfer of ${this.amount} ${this.selectedCoin} to<br/>${this.recipientAddress} was successful!</b>`)
          this.recipientAddress = ''
          this.selectedCoin = ''
          this.amount = ''
          this.$router.push('/account')
        } else {
          this.$noty.error(`<b>${result.error}</b>`)
        }
      }
    },
    submit: function () {
    }
  },
  created: async function () {
    let that = this
    let ownAddress = this.$store.getters.address

    this.transfers = []
    let sendTransfers = await this.$store.dispatch('getTransferInfo', { that, ownAddress: ownAddress })
    for (let i = 0; i < sendTransfers.transfers.length; ++i) {
      this.transfers.push(sendTransfers.transfers[i])
    }
    console.log(sendTransfers)
  },
  validations: {
    recipientAddress: {
      required,
      isValid: function (value) {
        this.$v.recipientAddress.$touch()
        // address is in form 16061381710736106488 or in form AGPsWetD3c19UTfuoHCQAeEhT5rXkui8bd
        let expression = /([a-z|0-9|A-Z]{34})$|(^[0-9]{20}$)/
        var regex = new RegExp(expression)
        return regex.test(value)
      }
    },
    selectedCoin: {
      required,
      isValid: function (value) {
        return value.length > 1
      }
    },
    amount: {
      required
    }
  }
}
</script>

<style scoped>
.primary-color {
  color: #1678c2;
}
</style>
