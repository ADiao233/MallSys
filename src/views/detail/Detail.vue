<!-- 商品详情页 -->
<template>
  <div id="detail">
    <DetailNavBar @titleClick="titleClick" ref="nav"></DetailNavBar>
    <Scroll
      class="content"
      ref="scroll"
      @scroll="contentScroll"
      :probe-type="3"
    >
      <DetailSwiper :top-images="topImages"></DetailSwiper>
      <DetailBaseInfo :goods="goods"></DetailBaseInfo>
      <DetailShopInfo :shop="shop"></DetailShopInfo>
      <DetailGoodsInfo
        :detailInfo="detailInfo"
        @imageLoad="imageLoad"
      ></DetailGoodsInfo>
      <DetailParamsInfo :paramInfo="paramInfo" ref="params"></DetailParamsInfo>
      <DetailCommentInfo :rate="rate" ref="comment"></DetailCommentInfo>
      <GoodsList :goods="recommend" ref="goodslist"></GoodsList>
    </Scroll>
    <DetailBottomBar @addCart="addToCart" />
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar";
import DetailSwiper from "./childComps/DetailSwiper";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailShopInfo from "./childComps/DetailShopInfo";
import Scroll from "components/common/scroll/Scroll";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
import DetailCommentInfo from "./childComps/DetailCommentInfo";
import DetailParamsInfo from "./childComps/DetailParamsInfo";
import GoodsList from "@/components/content/goods/GoodsList";
import DetailBottomBar from "./childComps/DetailBottomBar";

import { getDetail, Goods, Shop, getRecommend } from "network/detail";
import { itemListenterMixin } from "common/mixin";
import { debounce } from "@/common/utils";
import { mapActions } from "vuex";

export default {
  name: "Detail",
  mixins: [itemListenterMixin],
  data() {
    return {
      iid: null,
      //轮播图展示图片
      topImages: [],
      //商品的基本信息
      goods: {},
      //商家信息
      shop: {},
      //穿着效果等
      detailInfo: {},
      //尺码
      paramInfo: {},
      //评论信息
      rate: {},
      //推荐信息
      recommend: [],
      //各个部分的顶部y轴坐标
      themeTopYs: [],
      //获取顶部坐标的函数名称
      getThemeTpoY: null,
      //topbar的索引
      currentIndex: 0,
      //简介
      desc: "",
    };
  },
  created() {
    //保存iid
    this.iid = this.$route.query.iid;
    //根据iid请求数据
    getDetail(this.iid).then((res) => {
      const data = res.result;
      //1.获取顶部图片
      this.topImages = data.itemInfo.topImages;
      //2.获取商品信息
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );
      //3.获取商家信息
      this.shop = new Shop(data.shopInfo);
      //4.获取商品详情
      this.detailInfo = data.detailInfo;
      //5.获取产品参数信息
      this.paramInfo = data.itemParams;
      //6.获取评论信息
      if (data.rate.cRate != 0) {
        this.rate = data.rate.list[0];
      }
    });
    //获取推荐数据
    getRecommend(this.iid).then((res) => {
      console.log(res.data.list);
      this.recommend = res.data.list;
    });
    //获取内容对应坐标
    this.getThemeTpoY = debounce(() => {
      this.themeTopYs = [];
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.params.$el.offsetTop);
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      this.themeTopYs.push(this.$refs.goodslist.$el.offsetTop);
      this.themeTopYs.push(Number.MAX_VALUE);
    }, 50);
  },
  destroyed() {
    this.$bus.$off("itemImgeLoad", this.detailItemListener);
  },
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
    DetailGoodsInfo,
    DetailCommentInfo,
    DetailParamsInfo,
    GoodsList,
    DetailBottomBar,
    // Toast,
  },
  methods: {
    ...mapActions(["addCart"]),
    imageLoad() {
      this.$refs.scroll.refresh();
      //在所有图片加载完毕进行获取
      this.getThemeTpoY();
    },
    //监听标题的点击
    titleClick(index) {
      this.$refs.scroll.refresh();
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 200);
    },
    //监听scroll事件，跳转标题
    contentScroll(position) {
      const positionY = -position.y;
      let length = this.themeTopYs.length;
      for (let i = 0; i < length - 1; i++) {
        if (this.currentIndex != i) {
          if (
            positionY >= this.themeTopYs[i] &&
            positionY < this.themeTopYs[i + 1]
          ) {
            this.currentIndex = i;
            this.$refs.nav.currentIndex = this.currentIndex;
          }
        }
      }
    },
    addToCart() {
      const product = {};
      //1.获取购物车需要展示的信息
      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.realPrice;
      product.iid = this.iid;
      //映射
      this.addCart(product).then((res) => {
        this.$toast.Show(res, 2000);
      });
    },
  },
};
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 10;
  background-color: #fff;
  height: 100vh;
}
.detail-nav {
  position: relative;
  z-index: 10;
}
.content {
  /* height: 88vh; */
  /* position: relative;
  top: 0vh;
  bottom: 50vh;
  left: 0;
  right: 0; */
  overflow: hidden;
  position: absolute;
  top: 6vh;
  bottom: 6vh;
  left: 0;
  right: 0;
}
</style>
