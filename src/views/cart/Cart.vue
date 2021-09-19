<template>
  <div id="cart">
    <nav-bar class="nav-bar"><div slot="center">购物车({{cartListLength}})</div></nav-bar>
    <cart-list class="cart-list" :cart-list="cartList"></cart-list>
    <bottom-bar></bottom-bar>
  </div>
</template>

<script>
  import NavBar from 'common/navbar/NavBar'
  import CartList from './childComps/CartList'
  import BottomBar from './childComps/BottomBar'

  import { mapGetters } from 'vuex'

	export default {
		name: "Cart",
    components: {
		  NavBar,
      CartList,
      BottomBar
    },
    computed: {
      ...mapGetters(['cartList', 'cartListLength'])
    }
	}
</script>

<style scoped>
  #cart {
    /*position: relative;*/
    height: 100vh;
  }

  .nav-bar {
    background-color: var(--color-tint);
    font-weight: 700;
    color: #fff;
  }

  .cart-list {
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 93px;
    left: 0;
    right: 0;
  }
</style>
