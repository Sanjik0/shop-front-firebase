<template>
    <div class="col s12 m6">
        <div>
            <div class="page-subtitle">
                <h4>{{'Edit' | localize}}</h4>
            </div>

            <form @submit.prevent="submitHandler">
                <div class="input-field" >
                    <select ref="select" v-model="current">
                        <option v-for="category in categories" :key="category.id" :value="category.id">
                            {{category.title}}
                        </option>
                    </select>
                    <label>{{'Select_Category' | localize}}</label>
                </div>

                <div class="input-field">
                    <input
                        id="name"
                        type="text"
                        v-model="title"
                        :class="{invalid: $v.title.$dirty && !$v.title.required}"
                    >
                    <label for="name">{{'Title' | localize}}</label>
                    <span 
                        v-if="$v.title.$dirty && !$v.title.required"
                        class="helper-text invalid"
                    >
                        {{'Enter_category' | localize}}
                    </span>
                </div>

                <div class="input-field">
                    <input
                        id="limit"
                        type="number"
                        v-model.number="limit"
                        :class="{invalid: $v.limit.$dirty && !$v.limit.minValue}"
                    >
                    <label for="limit">{{'Limit' | localize}}</label>
                    <span 
                        class="helper-text invalid"
                        v-if="$v.limit.$dirty && !$v.limit.minValue"
                    >
                        {{'Minimum_value' | localize}} {{$v.limit.$params.minValue.min}}
                    </span>
                </div>

                <button class="btn waves-effect waves-light" style="background: #4fc3f7" type="submit">
                {{'Update' | localize}}
                <i class="material-icons right">send</i>
                </button>
            </form>
        </div>
    </div>
</template>

<script>
import  {required, minValue} from 'vuelidate/lib/validators'

export default {
    props: {
        categories: {
            type: Array,
            required: true
        }
    },
    data:() => ({
        select: null,
        title: '',
        limit: 100,
        current: null
    }), 
    validations: {
        title: {required},
        limit: {minValue: minValue(100)}
    },
    watch: {
        current(catId) {
            const {title, limit} = this.categories.find(category => category.id === catId)
            this.title = title
            this.limit = limit
        }
    },
    created () {
        const {id, title, limit} = this.categories[0]
        this.current = id
        this.title = title
        this.limit = limit
    },
    methods: {
        async submitHandler() {
            if (this.$v.$invalid) {
                this.$v.$touch()
                return
            }

            try {
                const categoryData = {
                    id: this.current,
                    title: this.title,
                    limit: this.limit
                }
                await this.$store.dispatch('updateCategory', categoryData)   
                this.$message('Категория успешно изменена')
                this.$emit('updated', categoryData)
            } catch (error) {
                console.log(e)
            }
        }
    },
    mounted () {
        M.updateTextFields()
        this.select = M.FormSelect.init(this.$refs.select);
    },
    destroyed() {
        if (this.select && this.select.destroyed) {
            this.select.destroyed()
        }
    }
}
</script>

<style lang="scss" scoped>
@media (max-width: 400px) {
  .page-subtitle {
      margin-top: 2rem;
      h4 {
          font-size: 1.75rem;
          margin-bottom: 1rem;
      }
  }
}
</style>