<template>
  <div>
      <Loader v-if="loading" />
      <div class="app-main-layout" v-else>
        <Navbar @clickBtn="isOpen = !isOpen" />

        <main class="app-content full">
          <div class="app-page">
            <router-view />
          </div>
        </main>

        <div class="fixed-action-btn">
          <router-link class="btn-floating btn-large blue" to="/record">
            <i class="large material-icons">add</i>
          </router-link>
        </div>
      </div>
  </div>
</template>

<script>
import Navbar from '@/components/app/Navbar'
import messages from '@/utils/messages'

export default {
    name: 'main-layout',
    data:() => ({
        isOpen: false,
        loading: true
    }),
    async mounted() {
      if(!Object.keys(this.$store.getters.info).length) {
        await this.$store.dispatch('fetchInfo')
      }

      this.loading = false
    },
    components: {
        Navbar
    },
    computed: {
        error() {
            return this.$store.getters.error
        },
        locale() {
          return this.$store.getters.info.locale
        }
    },
    watch: {
        locale() {
          console.log('Locale changed')
        },
        error(fbError) {
            console.log(fbError)
            this.$error(messages[fbError.code] || 'Что-то пошло не так')
        }
    }
}
</script>
