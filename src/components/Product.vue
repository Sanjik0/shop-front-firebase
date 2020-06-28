<template>
    <div class="row">
        <div class="col s12 m3" v-for="(product, index) in products" :key="index">
            <div class="card">
                <div class="card-image">
                    <img :src="product.img">
                    <span class="card-title">{{product.title}}</span>
                </div>
                <div class="card-content">
                    <p>{{product.description}}</p>
                    <h5><b>{{product.amount}} тг.</b></h5>
                </div>
                <div class="card-action">
                    <a href="#">Подробнее</a>
                    <a class="basket-btn">В корзину</a>
                </div>
            </div>   
        </div> 
    </div>
</template>

<script>
export default {
    data: () => ({
        products: [],
    }),
    async created() {
        this.products = await this.$store.dispatch('fetchRecords')
    }
}
</script>

<style lang="scss" scoped>
.card-action {
    display: flex;
    justify-content: space-between;
    .basket-btn {
        margin-right: 0 !important;
        cursor: pointer;
    }
}
.card-title {
    background: #4fc3f7 !important;
    display: block !important;
    width: 100%;
    padding: 0.625rem 0.9375rem !important;
    font-size: 1.25rem;
}
</style>