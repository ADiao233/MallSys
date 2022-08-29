<!-- 顶部导航 -->
<template>
  <div class="nav-bar">
    <div class="left"><slot name="left"></slot></div>
    <div class="center"><slot name="center"></slot></div>
    <div class="right"><slot name="right"></slot></div>
  </div>
</template>

<script>
export default {
  name: "navbar",
};
</script>

<style scoped>
.nav-bar {
  font-size: 5vw;
  display: flex;
  line-height: 6vh;
  height: 6vh;
  /* background-color: pink; */
  text-align: center;
  outline:solid ;
  /* box-shadow: 0 1px 1px rgba(1, 1, 1, 0.1); */
}
.right,
.left {
  width: 15vw;
}
.center {
  flex: 1;
}
</style>
