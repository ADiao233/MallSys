<!--分类组件-->
<template>
  <div class="category">
    <navbar class="category_nav"><div slot="center">分类</div></navbar>
    <div class="betweenmaid">
      <NavList :category="category" @tabClick="tabClick"></NavList>
      <CategoryList :goods="goods"></CategoryList>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/common/navbar/Navbar.vue";
import CategoryList from "./childComps/CategoryList.vue";
import NavList from "./childComps/NavList";
import { getCategorytitle, getCategorydata } from "network/category";

export default {
  name: "Category",
  data() {
    return {
      category: {}, //总分类数据
      currentindex: 0, // 导航列表下标
      maitKey: 3627, //导航列表项ID
      // miniWallkey: 10062603, 
      goods: {},
    };
  },
  methods: {
    //获取导航列表
    getCategorytitle() {
      getCategorytitle().then((res) => {
        console.log(res);
        this.category = res.data.category;
        this.maitKey = this.category.list[this.currentindex].maitKey;
        // this.miniWallkey = this.category.list[this.currentindex].miniWallkey;
      });
    },
    //根据导航列表项ID 获取不同的分类数据
    getCategorydata(maitKey) {
      getCategorydata(maitKey).then((res) => {
        this.goods = res.data;
        // console.log(this.goods)
      });
    },
    // getCategoryDetaildata() {
    //   getCategoryDetaildata(this.miniWallkey).then();
    // },
    //根据子组件传递的index
    tabClick(index) {
      //获取maityKey
      this.currentindex = index;
      this.maitKey = this.category.list[this.currentindex].maitKey;
      //根据不同的index获取右侧展示区
      this.getCategorydata(this.maitKey);
    },
  },
  created() {
    //初始化时请求数据导航列表和分类数据
    this.getCategorytitle();
    this.getCategorydata(this.maitKey);
  },
  components: {
    Navbar,
    NavList,
    CategoryList,
  },
};
</script>

<style scoped>
.category_nav {
  background-color: var(--color-tint);
  color: #fff;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
}
.betweenmaid {
  display: flex;
}
</style>
