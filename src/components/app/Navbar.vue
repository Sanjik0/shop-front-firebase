<template>
  <nav class="navbar light-blue lighten-2">
    <div class="nav-wrapper">
      <div class="navbar-left">
        <router-link tag="a" class="logo" to="/">
          <b>Online Store</b>
        </router-link>
        <ul class="menu">
          <router-link tag="li" to="/record">
            Добавить продукт
          </router-link>
        </ul>
      </div>
      <ul class="right hide-on-small-and-down">
        <li>
         <router-link tag="a" to="/basket"><i class="material-icons right">local_grocery_store</i></router-link>
        </li>
        <li>
          <a class="dropdown-trigger white-text" href="#" data-target="dropdown" ref="dropdown">
            {{name}}
            <i class="material-icons right">arrow_drop_down</i>
          </a>
          <ul id="dropdown" class="dropdown-content">
            <li>
              <router-link to="/profile" class="black-text">
                <i class="material-icons">account_circle</i>{{'ProfileTitle' | localize}}
              </router-link>
            </li>
            <li class="divider" tabindex="-1"></li>
            <li>
              <a href="#" class="black-text" @click.prevent="logout">
                <i class="material-icons">assignment_return</i>{{'Logout' | localize}}
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import { log } from 'util'
export default {
    data: () => ({
        date: new Date(),
        interval: null,
        dropdown: null
    }),
    methods: {
        async logout() {
            await this.$store.dispatch('logout')
            this.$router.push('/login?message=logout')
        }
    },
    computed: {
      name() {
        return this.$store.getters.info.name
      },
    },
    async mounted() {
        this.interval = setInterval(() => {
            this.date = new Date()
        }, 1000)
        this.dropdown = M.Dropdown.init(this.$refs.dropdown, {
            constrainWidth: false
        })
    },
    beforeDestroy() {
        clearInterval(this.interval)
        if(this.dropdown && this.dropdown.destroy) {
            this.dropdown.destroy()
        }
    }
}
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Aclonica&display=swap');

.hide-on-small-and-down {
  display: block !important;
}
.logo {
  margin-bottom: -0.375rem;
  b {
    font-size: 1.25rem;
    font-family: 'Aclonica', sans-serif;
  }
}
.menu {
  li {
    padding: 0 1rem;
    padding-top: 0.1875rem;
    cursor: pointer;
    &:hover {
      color: #4fc3f7;
      background: #fff;
    }
  }
}
</style>