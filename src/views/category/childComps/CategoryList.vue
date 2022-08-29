<!-- 右侧分类列表 -->
<template>
  <div class="category-list">
    <scroll class="content" :probe-type="3" :pull-up-load="true" ref="scroll">
      <div class="list">
        <div
          v-for="(item, index) in goods.list"
          class="goods-item"
          :key="index"
        >
          <a :href="item.link">
            <img :src="item.image" alt="" @load="imgLoad" />
            <div>
              <span>{{ item.title }}</span>
            </div>
          </a>
        </div>
      </div>
    </scroll>
  </div>
</template>

<script>
import Scroll from "components/common/scroll/Scroll";
export default {
  name: "CategoryList",
  data() {
    return {};
  },
  props: {
    goods: {
      type: Object,
      default: {},
    },
  },
  components: {
    Scroll,
  },
  methods: {
    imgLoad() {
      //等待图片加载完毕刷新scroll
      this.$refs.scroll.refresh();
    },
  },
  updated() {
    //切换列表回到顶部
    this.$refs.scroll.scrollTo(0, 0, 0);
  },
};
</script>

<style scoped>
.category-list {
  position: relative;
  top: 6vh;
  height: 94vh; /*设置高度出现滚动条*/
  width: 70vw;
}
.content {
  overflow: hidden;
  position: absolute;
  top: 0;
  bottom: 6vh;
  right: 0;
  width: 70vw;
  background-color: #fff;
}
.list {
  display: flex;
  width: 70vw;
  flex-wrap: wrap;
  justify-content: flex-start;
  text-align: center;
}
.goods-item {
  padding: 0 1vw;
}
.goods-item img {
  width: 33vw;
}
</style>
