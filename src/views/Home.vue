<template>
  <div>
    <div>

      <div class="page-title">
        <h3>Каталог товаров</h3>
      </div>

      <Loader v-if="loading" />

      <Product v-else />
      
    </div>
  </div>
</template>

<script>
import Product from '@/components/Product'

export default {
  metaInfo() {
      return {
          title: 'Каталог'
      }
  },
  components: {
    Product
  },
  name: "home",
  data: () => ({
    loading: true, 
    currency: null,
    rates: {}
  }),
  async mounted() {
      this.currency = await this.$store.dispatch('fetchCurrency')
      console.log(this.currency)
      this.rates = this.currency.conversion_rates
      this.loading = false
  },
};
</script>