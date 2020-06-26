<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button :is-checked="isSelectAll" class="check-button" @click.native="checkClick" />
      <div>全选</div>
    </div>
    <div class="price">合计:{{totalPrice}}</div>
    <div class="calculate" @click="calcClick">
      去计算({{checkedLength}})
    </div>
  </div>
</template>

<script>
import CheckButton from "components/content/checkButton/CheckButton";
import { mapGetters } from "vuex";

export default {
  name: "CartBottomBar",
  components: {
    CheckButton
  },
  methods:{
    checkClick(){
      if(this.isSelectAll){
        this.cartList.forEach(item => item.checked = false)
      }else{
        this.cartList.forEach(item => item.checked = true);
      }
      // this.cartList.forEach(item => item.checked = !this.isSelectAll);
      // 不用下面的方法是在遍历的过程中isSelectAll有可能发生变化
    },
    calcClick(){
      if (!this.isSelectAll){
        this.$toast.show('请选择购买的商品',1500)
      }
    }
  },
  computed: {
    ...mapGetters(["cartList"]),
    totalPrice() {
      return (
        "￥" +
        this.cartList
          .filter(item => {
            return item.checked;
          })
          .reduce((preValue, item) => {
            return (preValue += item.price * item.count);
          }, 0)
          .toFixed(2)
      );
    },
    checkedLength() {
      return this.$store.getters.cartList
        .filter(item => {
          return item.checked;
        })
        .reduce((perValue, item) => {
          return (perValue += item.count);
        }, 0);
    },
    isSelectAll() {
      if (this.cartList.length === 0) return false;
      // return !this.cartList.filter(item => !item.checked).length
      //  return !this.cartList.find(item => !item.checked)
      for (let item of this.cartList) {
        if (!item.checked) {
          return false;
        }
      }
      return true;
    }
  }
};
</script>

<style>
.bottom-bar {
  height: 40px;
  line-height: 40px;

  background-color: #eee;

  position: relative;
  display: flex;
}
.check-content {
  display: flex;
  align-items: center;
  margin-left: 10px;
  width: 20%;
}
.check-button {
  height: 20px;
  width: 20px;
  line-height: 20px;
  margin-right: 5px;
}
.price {
  flex: 1;
}
.calculate {
  background-color: rgb(253, 0, 0);
  color: #fff;
  /* opacity: 0.3; */
  width: 25%;
  text-align: center;
}
</style>