<!--购物车-->
<template>
  <div class="cart">
    <!-- 导航 -->
    <navbar class="cart_nav"
      ><div slot="center">购物车({{ cartLength }})</div></navbar
    >
    <!-- 列表 -->
    <CartList></CartList>
    <!-- 底部汇总 -->
    <CartBottomBar></CartBottomBar>
  </div>
</template>

<script>
import Navbar from "@/components/common/navbar/Navbar.vue";
import CartList from "./childComps/CartList.vue";
import CartBottomBar from "./childComps/CartBottomBar.vue";

import { mapGetters } from "vuex";

export default {
  name: "cart",
  data() {
    return {
      counts: 0,
    };
  },
  components: {
    Navbar,
    CartList,
    CartBottomBar,
  },
  computed: {
    //购物车数量
    ...mapGetters(["cartLength"]),
  },
};
</script>

<style scoped>
.cart {
  position: absolute;
  right: 0;
  left: 0;
  top: 0;
  bottom: 0;
}
.cart_nav {
  background-color: var(--color-tint);
  color: #fff;
  position: fixed;
  top: 0;
  width: 100%;
}
</style>
