<!-- 购物车底部 -->
<template>
  <div class="bottom-bar">
    <!-- 按钮 -->
    <div class="check">
      <CheckButton
        class="check-button"
        :is-checked="IsSelectAll"
        @click.native="checkClick"
      ></CheckButton>
      <div>全选</div>
    </div>
    <!-- 合计 -->
    <div class="count">合计:{{ totalPrice }}</div>
    <!-- 结算 -->
    <div class="settle" @click="calcClick">去结算({{ checkCount }})</div>
  </div>
</template>

<script>
import CheckButton from "@/components/content/checkButtom/CheckButton";
import { mapGetters } from "vuex";
export default {
  name: "CartBottomBar",
  components: {
    CheckButton,
  },
  computed: {
    ...mapGetters(["cartList"]),
    totalPrice() {
      return (
        "￥" +
        this.cartList
          .filter((item) => {
            return item.checked;
          })
          .reduce((preValue, item) => {
            return preValue + item.price * item.count;
          }, 0)
          .toFixed(2)
      );
    },
    checkCount() {
      return this.cartList.reduce((preValue, item) => {
        return preValue + item.count;
      }, 0);
    },
    //是否全选
    IsSelectAll() {
      //只要找出至少一个未勾选的值，没找到返回undefined
      return this.cartList.length
        ? !this.cartList.find((item) => !item.checked)
        : false;
    },
  },
  methods: {
    checkClick() {
      if (this.IsSelectAll) {
        this.cartList.forEach((item) => {
          item.checked = false;
        });
      } else {
        this.cartList.forEach((item) => {
          item.checked = true;
        });
      }
      //因为每次IsSelectAll是计算属性，每次get时都会判断当前cartList
      //这种简化方案不可用
      // this.cartList.forEach(element => {
      //     element.checked = !this.IsSelectAll
      //   });
    },
    calcClick() {
      //只要找出至少一个勾选的值，没找到返回undefined
      if (!this.cartList.find((item) => item.checked)) {
        this.$toast.Show("请选择购买的商品", 2000);
      }
    },
  },
};
</script>

<style scoped>
.bottom-bar {
  width: 100%;
  height: 6vh;
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: space-around;
  bottom: 6vh;
  border-top: 1px solid #f6f6f6;
  font-size: 2vh;
}
.check {
  display: flex;
  width: 20vw;
  height: 6vh;
  align-items: center;
  padding-left: 2.5vw;
}

.count {
  width: 40vw;
  height: 6vh;
  line-height: 6vh;
  text-align: center;
}
.settle {
  background-color: var(--color-tint);
  color: #fff;
  width: 40vw;
  height: 6vh;
  line-height: 6vh;
  text-align: center;
}
</style>
