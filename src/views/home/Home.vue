<!-- 主页 -->
<template>
  <div id="home">
    <navbar class="home-nav"><div slot="center">首页</div></navbar>
    <TabControl
      :titles="['流行', '新款', '精选']"
      @tabClick="tabClick"
      ref="tabControl1"
      class="tabControl"
      v-show="isTabfixed"
    ></TabControl>
    <!--惯性滑动，position，上拉加载-->
    <Scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @scroll="contentScroll"
      :pull-up-load="true"
      @pullingUp="loadMore"
    >
      <homeSwiper
        :banners="banners"
        class="homeswiper"
        @swiperImgeLoad.once="swiperImgeLoad"
      ></homeSwiper>
      <RecommendView
        :recommends="recommends"
        @swiperImgeLoad.once="swiperImgeLoad"
      ></RecommendView>
      <FeatureView @swiperImgeLoad.once="swiperImgeLoad"></FeatureView>
      <TabControl
        :titles="['流行', '新款', '精选']"
        @tabClick="tabClick"
        ref="tabControl2"
      ></TabControl>
      <!-- 商品列表 -->
      <GoodsList :goods="showGoods"></GoodsList>
    </Scroll>
    <BackTop @click.native="backClick" v-show="isShowBackTop"></BackTop>
  </div>
</template>

<script>
//轮播图，推荐，特色专栏
import homeSwiper from "./childComps/HomeSwiper";
import RecommendView from "./childComps/RecommendView";
import FeatureView from "./childComps/FeatureView";
//首页头，商品类型控制，商品列表,滑动插件，回到顶部
import Navbar from "components/common/navbar/Navbar.vue";
import TabControl from "components/content/tabControl/TabControl";
import GoodsList from "components/content/goods/GoodsList";
import Scroll from "components/common/scroll/Scroll";
import BackTop from "components/content/backTop/BackTop";
//获取轮播图等数据，获取商品列表
import { getHomeMultidata, getHomeGoods } from "network/home";
import { itemListenterMixin } from "common/mixin";

export default {
  name: "home",
  mixin: [itemListenterMixin],
  data() {
    return {
      banners: [],//轮播图数据
      recommends: [],//推荐图数据
      goods: {    //商品列表数据
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      currenttype: "pop",//商品分类标签数据
      isShowBackTop: false,//是否显示[回到顶部]
      tabOffsetTop: 0,
      isTabfixed: false,//是否吸顶
      saveY: 0,
    };
  },
  components: {
    Navbar,
    homeSwiper,
    RecommendView,
    FeatureView,
    TabControl,
    GoodsList,
    Scroll,
    BackTop,
  },
  computed: {
    //商品列表数据
    showGoods() {
      return this.goods[this.currenttype].list;
    },
  },
  //在下一次进入时跳转到上一次的位置  配合keep-alive
  //不刷新可能会回到顶部
  activated() {
    this.$refs.scroll.refresh();
    this.$refs.scroll.scrollTo(0, this.saveY, 0);
    // this.$refs.scroll.refresh()
  },
  //为了保险记录一下离开前停留位置
  deactivated() {
    this.saveY = this.$refs.scroll.getscrollY();
    this.$bus.$off("itemImgeLoad", this.ItemListener);
  },
  created() {
    //请求数据，调用封装在methods中的请求方法
    this.getHomeMultidata();
    //请求商品数据
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  mounted() {},
  methods: {
    //监听切换标签
    tabClick(index) {
      switch (index) {
        case 0:
          this.currenttype = "pop";
          break;
        case 1:
          this.currenttype = "new";
          break;
        case 2:
          this.currenttype = "sell";
          break;
      }
      //控制样式变化
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },
    //回到顶部
    backClick() {
      this.$refs.scroll.scrollTo(0, 0);
    },
    //判断回到顶部是否显示
    contentScroll(position) {
      //判断是否显示回到顶部
      this.isShowBackTop = -position.y > 1000;
      //判断是否吸顶显示头部导航
      this.isTabfixed = -position.y > this.tabOffsetTop;
    },
    //Scroll上拉加载触发
    loadMore() {
      this.getHomeGoods(this.currenttype);
    },
    //监听图片的加载(确保拿到是正确的offsetTop)
    swiperImgeLoad() {
      //获取tabcontrol的offsettop
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
    },

    //网络请求
    getHomeMultidata() {
      getHomeMultidata().then((res) => {
        //获取轮播图和首页推荐数据
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    //获取商品列表数据
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then((res) => {
        //数据拼接
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;
        this.$refs.scroll.finishPullUp();
        this.$refs.scroll.refresh();
      });
    },
  },
};
</script>

<style scoped>
#home {
  /* padding-top: 6vh; */
  height: 94vh;
}
.home-nav {
  background-color: var(--color-tint);
  color: #fff;
  /* 使用scroll后不需要使用这个 */
  /* position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9; */
}
.content {
  /* height: 88vh; */
  overflow: hidden;
  position: absolute;
  top: 6vh;
  bottom: 6vh;
  left: 0;
  right: 0;
}
.tabControl {
  position: relative;
  background-color: #fff;
  z-index: 9;
}
</style>
