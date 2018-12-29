<template>
  <div class="ui segment">

    <!--searchbar-->
    <div>

      <sui-form v-on:submit.prevent>

        <sui-grid :columns="3">
          <sui-grid-row>

            <sui-grid-column :width="10">
              <sui-form-field>
                <sui-input :placeholder="currentOption"
                           v-model="searchString"
                           @keydown.enter.prevent="search" autofocus></sui-input>
              </sui-form-field>
            </sui-grid-column>

            <sui-grid-column :width="4">
              <sui-dropdown class="labeled icon"
                icon="world"
                button
                selection
                value="domain"
                v-model="currentOption"
                :options="searchOptions"
                openOnFocus/>
            </sui-grid-column>

            <sui-grid-column :width="2">
              <sui-form-field>
                <sui-button :disabled="$v.searchString.$invalid"
                            @click="search">Search</sui-button>
              </sui-form-field>
            </sui-grid-column>

          </sui-grid-row>
        </sui-grid>

      </sui-form>

      <!--list-->
      <div class="ui segment">
          <sui-table celled padded>

            <sui-table-header>
              <sui-table-row>
                <sui-table-header-cell single-line>Address</sui-table-header-cell>
                <sui-table-header-cell>IP-Address</sui-table-header-cell>
                <sui-table-header-cell>Owner</sui-table-header-cell>
                <sui-table-header-cell>Suffix</sui-table-header-cell>
              </sui-table-row>
            </sui-table-header>

            <sui-table-body>
              <sui-table-row v-for="domain in domains" :key="domain.address">
                <sui-table-cell>
                  <h4 text-align="center" v-if="domain.ip">
                    <a :href="`http://${domain.ip}`">{{domain.address}}</a>
                  </h4>
                  <h4 text-align="center" v-else>
                    {{domain.address}}
                  </h4>
                </sui-table-cell>
                <sui-table-cell single-line>
                  <div v-if="domain.ip">
                    {{domain.ip}}
                  </div>
                  <div v-else>
                    <router-link replace
                                 :to="{ path: 'register', query: { domain: domain.address }}">IP-Address not set</router-link>
                  </div>
                </sui-table-cell>
                <sui-table-cell>
                  <a :href="`https://explorer.entanmo.com/searchResult.html?type=2&q=${domain.owner}`">{{domain.owner}}</a>
                </sui-table-cell>
                <sui-table-cell>
                  {{domain.suffix}}
                </sui-table-cell>
              </sui-table-row>
            </sui-table-body>

          </sui-table>
      </div>
    </div>
  </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
export default {
  name: 'address-list',
  data: function () {
    return {
      searchString: '',
      currentOption: '',
      searchOptions: [
        { text: 'search domains', value: 'domain' },
        { text: 'search .com,.net...', value: 'postfix', description: 'postfix' }
      ],
      domains: [{
        address: '',
        ip: '',
        owner: '',
        suffix: ''
      }]
    }
  },
  created: function () {
    this.currentOption = 'domain'
    this.domains = []
  },
  methods: {
    search: async function () {
      let that = this
      let result = ''
      if (this.currentOption === 'domain') {
        result = await this.$store.dispatch('searchDomain', { that, domain: this.searchString })
        this.domains = []
        if (result.success && result.success === true && typeof result === 'object' && 'address' in result) {
          let newEntry = {
            address: result.address,
            ip: result.ip,
            owner: result.owner,
            suffix: result.suffix
          }
          this.domains.push(newEntry)
        } else {
          this.$noty.info(`<b>No domain found with "${this.searchString}"!</b>`)
        }
      }

      if (this.currentOption === 'postfix') {
        this.searchString = this.searchString.trim().replace('.', '')
        result = await this.$store.dispatch('searchPostfix', { that, postfix: this.searchString })
        this.domains = []
        if (Array.isArray(result) && result.length > 0) {
          let cleanedData = result.map(function (old) {
            return { address: old.address, ip: old.ip, owner: old.owner, suffix: old.suffix }
          })
          this.domains = cleanedData
        } else {
          this.$noty.info(`<b>No domains found with "${this.searchString}"!</b>`)
        }
      }

      this.searchString = ''
    }
  },
  validations: function () {
    return {
      searchString: {
        required,
        url: function (value) {
          if (this.currentOption === 'domain') {
            // eslint-disable-next-line
            var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi
            var regex = new RegExp(expression)
            return regex.test(value)
          } else {
            return value.length > 1 && value.length < 64
          }
        }
      }
    }
  }
}
</script>
