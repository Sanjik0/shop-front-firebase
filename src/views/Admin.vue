<template>
  <div>
      <h4 class="title">Admin</h4>
      <ul class="admin-buttons">
        <router-link tag="li" to="/record">Добавить продукт</router-link> 
        <router-link tag="li" to="/categories">Добавить категорию</router-link> 
      </ul>
  </div>
</template>

<script>

export default {
    async created() {
        console.log(await this.$store.dispatch('fetchInfo'));
    }
}

</script>

<style lang="scss">
.title {
    text-align: center;
}
.admin-buttons {
    padding: 1rem 3rem !important;
    li {
        padding: 2rem;
        margin: 1rem 0;
        text-align: center;
        background: #4fc3f7;
        cursor: pointer;
        font-size: 1.35rem;
        color: #fff;
        border-radius: 0.625rem;
        &:hover {
            background: #fff;
            color: #4fc3f7;
            -webkit-box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.75);
            -moz-box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.75);
            box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.75);
        }
    }
}
</style>