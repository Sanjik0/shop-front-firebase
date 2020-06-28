<template>
  <div>
      <div class="app-main-layout" >
            <router-view />
      </div>  
  </div>
</template>

<script>

export default {
    name: 'admin-layout',
    computed: {
        error() {
            return this.$store.getters.error
        },
    },
    watch: {
        error(fbError) {
            console.log(fbError)
            this.$error(messages[fbError.code] || 'Что-то пошло не так')
        }
    }
}
</script>
