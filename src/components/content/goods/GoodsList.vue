<!-- ๅๅๅ่กจ -->
<template>
  <div class="goods">
    <GoodsListItem v-for="(item,index) in goods" :goods-item="item" :key="index"></GoodsListItem>
  </div>
</template>

<script>
import GoodsListItem from './GoodsListItem';
export default {
  name:'GoodsList',
  data () {
    return {
    }
  },
  props:{
    goods:{
      type:Array,
      default(){
        return []
      }
    }
  },
  components:{
    GoodsListItem
  }
}
</script>

<style  scoped>
.goods{
  display: flex;
  width: 100vw;
  flex-wrap: wrap;
  justify-content: space-evenly ;
  padding: 2vh  0;
}
</style>
