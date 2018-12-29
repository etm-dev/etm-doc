<template>
  <div>
    <br/>
    <div class="ui segment">
      <h3>Withdraw</h3>
      <sui-form v-on:submit.prevent="submit">
        <sui-form-field>
          <label v-show="!$v.selectedCoin.$invalid">Currency</label>
          <label v-show="$v.selectedCoin.$invalid" style="color: rgb(219, 40, 40)">Invalid currency</label>
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
            <input type="number" step="any" min="0"
                   v-model="amount"
                   placeholder="amount"
                   :disabled="$v.selectedCoin.$invalid"
                   :error="$v.amount.$invalid">
          </div>
        </sui-form-field>

        <br/>
        <sui-form-field>
          <sui-button @click="withdraw"
                      class="ui button primary"
                      :disabled="$v.$invalid">Withdraw</sui-button>
        </sui-form-field>

      </sui-form>
    </div>

    <br/>
    <div class="ui segment">
      <h4>Withdrawals</h4>
      <sui-table celled padded>
        <sui-table-header>
          <sui-table-row>
            <sui-table-header-cell single-line>ID</sui-table-header-cell>
            <sui-table-header-cell>Coin</sui-table-header-cell>
            <sui-table-header-cell>Amount</sui-table-header-cell>
            <sui-table-header-cell>Timestamp</sui-table-header-cell>
            <sui-table-header-cell>Fee</sui-table-header-cell>
            <sui-table-header-cell>Block height</sui-table-header-cell>
          </sui-table-row>
        </sui-table-header>

        <sui-table-body>
          <sui-table-row v-for="draw in withdrawals" :key="draw.id">
            <sui-table-cell>{{draw.id | truncate(25, '...')}}</sui-table-cell>
            <sui-table-cell>{{draw.args | transWithdrawArgsFilter('currency')}}</sui-table-cell>
            <sui-table-cell>{{draw.args | transWithdrawArgsFilter('amount') / 1e8}}</sui-table-cell>
            <sui-table-cell>{{draw.timestamp | etmTime}}   </sui-table-cell>
            <sui-table-cell>{{draw.fee / 1e8 }}</sui-table-cell>
            <sui-table-cell>{{draw.height}}</sui-table-cell>
          </sui-table-row>
        </sui-table-body>
      </sui-table>
    </div>
  </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
import { create } from 'vue-modal-dialogs'
import questiondialog from '../modal/questiondialog'
import etmJS from 'etm-js'

const areYouSure = create(questiondialog)

export default {
  name: 'withdraw',
  data: function () {
    return {
      amount: '',
      selectedCoin: '',
      withdrawals: [
        {
          id: '',
          args: [''],
          timestamp: '',
          fee: '',
          height: ''
        }
      ]
    }
  },
  computed: {
    availableCoins: function () {
      return this.$store.getters.ownTransferableCoins
    }
  },
  created: async function () {
    let that = this
    let ownAddress = this.$store.getters.address

    this.withdrawals = []
    let result = await this.$store.dispatch('getWithdrawals', { that, ownAddress: ownAddress })
    if (result.success && result.success === true) {
      for (let i = 0; i < result.transactions.length; ++i) {
        this.withdrawals.push(result.transactions[i])
      }
    }
  },
  methods: {
    submit: function () {
    },
    withdraw: async function () {
      let answer = await areYouSure({
        title: 'Confirm',
        content: `Do you really want to withdraw <b>${this.amount} ${this.selectedCoin}</b> ?<br/><b>This operation costs 0.1 ${this.selectedCoin}.</b>`,
        yes: 'Yes',
        no: 'No'
      })
      if (answer === 'Yes') {
        let that = this
        let result = await this.$store.dispatch('dappWithdrawal', { that: that, etmJS, coin: this.selectedCoin, amount: this.amount })
        if (result.success && result.success === true) {
          this.$noty.success(`Dapp withdrawal of ${this.amount} ${this.selectedCoin} was successful!`)
          this.selectedCoin = ''
          this.amount = ''
          this.$router.push('/account')
        } else {
          this.$noty.error(`<b>${result.error}</b>`)
        }
      }
    }
  },
  validations: {
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
