<!-- 首页推荐数据 -->
<template>
  <div class="recommend">
    <div v-for="item in recommends" class="recommend-item">
      <a :href="item.link">
        <img :src="item.image" alt="" @load="imgeLoad" />
        <div>{{ item.title }}</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "RecommendView",
  props: {
    recommends: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  methods: {
    imgeLoad() {
      this.$emit("swiperImgeLoad");
    },
  },
};
</script>

<style scoped>
.recommend {
  display: flex;
  text-align: center;
  padding: 10px 0 20px;
  border-bottom: 5px solid #eee;
  font-size: 4vw;
}
.recommend-item {
  flex: 1;
}
.recommend-item img {
  width: 70%;
  margin-bottom: 10px;
}
</style>
