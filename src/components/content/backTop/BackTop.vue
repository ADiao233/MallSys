<!-- 回到顶部按钮 -->
<template>
  <div class="back-top">
    <img src="~assets/img/common/top.png" alt="" />
  </div>
</template>

<script>
export default {
  name: "BackTop",
};
</script>

<style scoped>
.back-top {
  position: fixed;
  top: 75vh;
  right: 1vw;
  z-index: 9;
}
.back-top img {
  width: 15vw;
}
</style>
