<!-- 商家信息 -->
<template>
  <div class="shop-info">
    <div class="shop-top">
      <img :src="shop.logo" />
      <span class="title">{{ shop.name }}</span>
    </div>
    <div class="shop-middle">
      <div class="shop-middle-item shop-middle-left">
        <div class="info-sells">
          <div class="sells-count">
            {{ shop.sells | sellCountFilter }}
          </div>
          <div class="sells-text">总销量</div>
        </div>
        <div class="info-goods">
          <div class="goods-count">
            {{ shop.goodsCount }}
          </div>
          <div class="goods-text">全部宝贝</div>
        </div>
      </div>
      <div class="shop-middle-item shop-middle-right">
        <table>
          <tr v-for="(item, index) in shop.score" :key="index">
            <td>{{ item.name }}</td>
            <td class="score" :class="{ 'score-better': item.isBetter }">
              {{ item.score }}
            </td>
            <td class="better" :class="{ 'better-more': item.isBetter }">
              <span>{{ item.isBetter ? "高" : "低" }}</span>
            </td>
          </tr>
        </table>
      </div>
    </div>
    <div class="shop-bottom">
      <!-- 数据链接没用，想使用将href改为 :href="shop.url" -->
      <a href="#javascript"><div class="enter-shop">进店逛逛</div></a>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailShopInfo",
  props: {
    shop: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  filters: {
    sellCountFilter: function (value) {
      if (value < 10000) return value;
      return (value / 10000).toFixed(1) + "万";
    },
  },
};
</script>

<style scoped>
.shop-info {
  padding: 3vh 3vw;
  border-bottom: 5px solid #f2f5f8;
}

.shop-top {
  line-height: 7vh;
  /* 让元素垂直中心对齐 */
  display: flex;
  align-items: center;
}

.shop-top img {
  width: 12vw;
  height: 12vw;
  border-radius: 50%;
  border: 1px solid rgba(0, 0, 0, 0.1);
}

.shop-top .title {
  margin-left: 2vw;
  vertical-align: center;
}

.shop-middle {
  margin-top: 2vh;
  display: flex;
  align-items: center;
}

.shop-middle-item {
  flex: 1;
}

.shop-middle-left {
  display: flex;
  justify-content: space-evenly;
  color: #333;
  text-align: center;
  border-right: 1px solid rgba(0, 0, 0, 0.1);
}

.sells-count,
.goods-count {
  font-size: 5vw;
}

.sells-text,
.goods-text {
  margin-top: 1vh;
  font-size: 2vw;
}

.shop-middle-right {
  font-size: 3vw;
  color: #333;
}

.shop-middle-right table {
  width: 33vw;
  margin-left: 10vw;
}

.shop-middle-right table td {
  padding: 5px 0;
}

.shop-middle-right .score {
  color: #5ea732;
}

.shop-middle-right .score-better {
  color: #ff4777;
}

.shop-middle-right .better span {
  background-color: #5ea732;
  color: #fff;
  text-align: center;
  border-radius: 0.5vw;
}

.shop-middle-right .better-more span {
  background-color: #f13e3a;
}

.shop-bottom {
  text-align: center;
  margin-top: 2vh;
}

.enter-shop {
  display: inline-block;
  font-size: 4vw;
  background-color: #f2f5f8;
  width: 40vw;
  height: 5vh;
  text-align: center;
  line-height: 5vh;
  border-radius: 4vw;
}
</style>
