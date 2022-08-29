<!-- 底部导航 -->
<template>
  <div id="tab-bar">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "Tabbar",
};
</script>

<style scoped>
#tab-bar {
  width: 100%;
  height: 6vh;
  background-color: #f6f6f6;
  /* 使用弹性盒 */
  display: flex;
  justify-content: space-around;
  border-top: 1px solid #999;
  /* 开启固定定位 */
  position: fixed;
  /* 设置元素位置 */
  /* left: 0;
  right: 0; */
  bottom: 0;
  /* box-shadow: 0 -1px 1px rgba(0.5, 0.5, 0.5, 0.1); */
  z-index: 9;
}
</style>
