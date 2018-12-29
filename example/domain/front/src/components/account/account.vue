<template>
  <div>

    <br/>
    <div class="extra" style="overflow:hidden">
      <router-link to="/withdraw" class="ui right floated primary button">Withdraw</router-link>
      <router-link to="/transfer" class="ui right floated primary button">Transfer</router-link>
    </div>

    <div is="sui-divider" horizontal>
      <h4 is="sui-header">
       <i class="tag icon"></i>
       Address
      </h4>
    </div>

    <p>{{address}}</p>

    <br/>
    <br/>

    <div is="sui-divider" horizontal>
      <h4 is="sui-header">
        <i class="bar chart icon"></i>
        Balance
      </h4>
    </div>

    <sui-table celled striped>
      <sui-table-header>
        <sui-table-row>
          <sui-table-header-cell>Currency</sui-table-header-cell>
          <sui-table-header-cell>Balance</sui-table-header-cell>
        </sui-table-row>
      </sui-table-header>

      <sui-table-body>
        <sui-table-row v-for="line in balances" v-bind:key="line.currency">
          <sui-table-cell>{{line.currency}}</sui-table-cell>
          <sui-table-cell>{{line.balance / 1e8 }}</sui-table-cell>
        </sui-table-row>
      </sui-table-body>
    </sui-table>

    <br/>
    <br/>

    <div is="sui-divider" horizontal>
      <h4 is="sui-header">
        <i class="address card icon"></i>
        Nickname
      </h4>
    </div>

    <div>
      <h4 v-if="nickname">
        {{nickname}}
      </h4>
      <div v-else>

          <div class="ui grid">
            <div class="two column row">
              <div class="column right aligned">
                  <div class="ui input">
                    <input type="text"
                          placeholder="nickname not set"
                           v-model="newNickname"
                           :warning="$v.newNickname.$invalid"
                           :error="$v.newNickname.$invalid">
                </div>
              </div>

              <div class="column left aligned">
                <sui-button @click="setNickname" animated :disabled="$v.newNickname.$invalid">
                  <sui-button-content visible>
                    <i class="icon user"></i>
                    Input nickname
                  </sui-button-content>
                  <sui-button-content hidden>Save</sui-button-content>
                </sui-button>
              </div>
            </div>
          </div>

      </div>
    </div>
  </div>
</template>

<script>
import etmJS from 'etm-js'
import { create } from 'vue-modal-dialogs'
import questiondialog from '../modal/questiondialog'

const areYouSure = create(questiondialog)

export default {
  name: 'account',
  data: function () {
    return {
      newNickname: ''
    }
  },
  computed: {
    address: function () {
      return this.$store.state.userInfo.address
    },
    balances: function () {
      return this.$store.state.userInfo.balances
    },
    nickname: function () {
      return this.$store.state.userInfo.nickname
    }
  },
  mounted: async function () {
    console.log('mounted')
    let that = this
    let secret = this.$store.state.userInfo.secret

    setTimeout(async function () {
      let result = await that.$store.dispatch('getUserInfo', { that, secret, etmJS })
      console.log('settimeout')
      if (result.success && result.success === true) {
        that.$noty.info('User balances was updated')
      }
    }, 10000)
  },
  methods: {
    setNickname: async function () {
      let answer = await areYouSure({
        title: 'Confirm',
        content: `Are you really sure to set your nickname to <b>${this.newNickname}</b> ?<br/>This operation costs <b>10 XAS</b>.`,
        yes: 'Yes',
        No: 'No'
      })
      if (answer === 'Yes') {
        let that = this
        let result = await this.$store.dispatch('setNickname', { that, nickname: this.newNickname })
        if (result.success && result.success === true) {
          this.$noty.success(`<b>New nickname ${this.newNickname} was set!</b>`)
        } else {
          this.$noty.error(result.error)
        }
      }
    }
  },
  validations: {
    newNickname: {
      length: function (value) {
        return value.length > 0 && value.length < 256
      }
    }
  }
}
</script>
