<!-- 底部导航个体组件 -->
<template>
  <div class="tabbaritem" @click="itemClick">
    <!-- div包裹插槽可以给div添加样式继承给插槽不会被外部影响 -->
    <div v-if="isactive"><slot name="item-icon"></slot></div>
    <div v-else><slot name="item-active"></slot></div>
    <div :style="activestyle"><slot name="item-text"></slot></div>
  </div>
</template>

<script>
export default {
  name: "Tabbaritem",
  props: {
    path: String,
    activecolor: {
      String,
      default: "red",
    },
  },
  computed: {
    isactive() {
      //判断当前url是否活跃
      return this.$route.path.indexOf(this.path) != -1;
    },
    activestyle() {
      return this.isactive ? { color: this.activecolor } : {};
    },
  },
  methods: {
    itemClick() {
      //解决重复点击路由重复跳转报错的问题，如果是当前路由则不进行跳转
      if (!this.isactive) {
        this.$router.replace(this.path).catch((err) => {
          console.log(err);
        });
      }
    },
  },
};
</script>

<style scoped>
.tabbaritem {
  /* 设置弹性盒 */
  width: 25%;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* text-align: center; */
  height: 6vh;
  /* background-color: #f6f6f6; */
  /* line-height: 49px; */
  font-size: 3vw;
}
.tabbaritem img {
  width: 5vw;
  height: 5vw;
  margin-top: 3px;
  /* vertical-align: middle; */
}
</style>
