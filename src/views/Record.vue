<template>
  <div>
    <div class="page-title">
      <h3>Добавление продукта</h3>
    </div>

    <Loader v-if="loading" />
    
    <form class="form" v-else @submit.prevent="handleSubmit">
      <div class="input-field">
        <input id="img" type="text" v-model="img" :class="{invalid: $v.description.$dirty && !$v.description.required}" />
        <label for="img">URL картинки</label>
        <span 
            v-if="$v.description.$dirty && !$v.description.required"
            class="helper-text invalid"
        >
            {{'Enter_description' | localize}}
        </span>
      </div>

      <div class="input-field">
        <input id="title" type="text" v-model="title" :class="{invalid: $v.description.$dirty && !$v.description.required}" />
        <label for="title">Название</label>
        <span 
            v-if="$v.description.$dirty && !$v.description.required"
            class="helper-text invalid"
        >
            {{'Enter_description' | localize}}
        </span>
      </div>

      <div class="input-field">
        <select ref="select" v-model="category">
          <option v-for="cat in categories" :key="cat.id" :value="cat.id">{{cat.title}}</option>
        </select>
        <label>{{'Select_Category' | localize}}</label>
      </div>

      <div class="input-field">
        <input id="amount" type="number" v-model.number="amount" :class="{invalid: $v.amount.$dirty && !$v.amount.minValue}"/>
        <label for="amount">{{'Amount' | localize}}</label>
        <span 
          class="helper-text invalid"
          v-if="$v.amount.$dirty && !$v.amount.minValue"
        >
          {{'Minimum_value' | localize}} {{$v.amount.$params.minValue.min}}
        </span>
      </div>

      <div class="input-field">
        <input id="description" type="text" v-model="description" :class="{invalid: $v.description.$dirty && !$v.description.required}" />
        <label for="description">{{'Description' | localize}}</label>
        <span 
            v-if="$v.description.$dirty && !$v.description.required"
            class="helper-text invalid"
        >
            {{'Enter_description' | localize}}
        </span>
      </div>

      <button class="btn waves-effect waves-light" style="background: #4fc3f7" type="submit">
        {{'Create' | localize}}
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
import  {required, minValue} from 'vuelidate/lib/validators'
import {mapGetters} from 'vuex'

export default {
  metaInfo() {
      return {
          title: this.$title('Menu_NewRecord')
      }
  },
  name: 'record',
  data: () => ({
    loading: true,
    select: '',
    img: '',
    title: '',
    categories: [],
    category: null,
    amount: 1,
    description: ''
  }),
  validations: {
      amount: {minValue: minValue(1)},
      description: {required}
  },
  async mounted() {
    this.categories = await this.$store.dispatch('fetchCategories')
    this.loading = false

    if(this.categories.length) {
      this.category = this.categories[0].id
    }

    setTimeout(() => {
      this.select = M.FormSelect.init(this.$refs.select)
      M.updateTextFields()
    }, 0)
  },
  computed: {
    ...mapGetters(['info']),
   },
  methods: {
    async handleSubmit() {
      if (this.$v.$invalid) {
          this.$v.$touch()
          return
      }
      
      try {
        await this.$store.dispatch('createRecord', {
          img: this.img,
          title: this.title,
          categoryId: this.category,
          amount: this.amount,
          description: this.description,
          date: new Date().toJSON()
        })
        
        await this.$store.dispatch(`updateInfo`)
        this.$message('Запись успешно создана')
        this.$v.$reset()
        this.amount = 1
        this.description = ''
      } catch (e) {
        console.log(e)
      }
    
    }
  },
  destroyed() {
    if (this.select && this.select.destroyed) {
        this.select.destroyed()
    }
  }
}
</script>
<style lang="scss" scoped>
.form {
  margin: 0 auto;
}
.page-title {
  justify-content: center;
}
@media (max-width: 400px) {
  .page-title {
    margin-bottom: 2rem;
  }
  .input-field {
    margin-top: 1.25rem;
  }
}
</style>