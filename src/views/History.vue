<template>
  <div>
    <div class="page-title">
      <h3>{{'Menu_History' | localize}}</h3>
    </div>

    <div class="history-chart">
      <canvas ref="canvas"></canvas>
    </div>

    <Loader v-if="loading" />

    <p class="center" v-else-if="!records.length">{{'No_posts_yet' | localize}} <router-link to="/record">{{'Add_New_Entry' | localize}}</router-link></p>

    <section class="table-wrapper" v-else>
      <HistoryTable :records="items" />

      <Paginate
        v-model="page"
        :page-count="pageCount"
        :click-handler="pageChangeHandler"
        :prev-text="prev"
        :next-text="next"
        :container-class="'pagination'"
        :page-class="'waves-effect'"
      />
    </section>
  </div>
</template>

<script>
import paginationMixin from '@/mixins/pagination.mixin'
import HistoryTable from '@/components/HistoryTable'
import {Pie} from 'vue-chartjs'
import localizeFilter from '@/filters/localize.filter'

export default {
  metaInfo() {
      return {
          title: this.$title('Menu_History')
      }
  },
  name: 'history',
  extends: Pie,
  components: {
    HistoryTable
  },
  mixins: [paginationMixin],
  data: () => ({
    loading: true,
    records: [],
    prev: localizeFilter('Prev'),
    next: localizeFilter('Next')
  }),
  async mounted() {
    this.records = await this.$store.dispatch('fetchRecords')
    const categories = await this.$store.dispatch('fetchCategories')

    this.setup(categories)

    this.loading = false
  },
  methods: {
    setup(categories) {
      this.setupPagination(this.records.map(record => {
        return {  
          ...record,
          categoryName: categories.find(c => c.id === record.categoryId).title,
          typeClass: record.type === 'income' ? 'green' : 'red',
          typeText: record.type === 'income' ? localizeFilter('Income') : localizeFilter('Outcome')
        }
      }))

      this.renderChart({
        labels: categories.map(c => c.title),
        datasets: [{
            label: localizeFilter('Costs_by_сategory'),
            data: categories.map(c => {
              return this.records.reduce((total, r) => {
                if (r.categoryId === c.id && r.type === 'outcome') {
                  total += +r.amount
                }
                return total
              }, 0)
            }),
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 2
        }]
      })
    }
  }
} 
</script>

<style lang="scss">
.pagination li.active {
  background: #26a69a;
}
.table-wrapper {
  overflow-y: auto;
}
</style>