<template>

  <div class="tab-bar-item" @click = "itemClick">
    
    <div v-if="!isActive"><slot name="item-icon"></slot></div>
    <div v-else><slot name="item-icon-active"></slot></div>
    <div :style="activestyle"><slot name="item-text"></slot></div>
  </div>

</template>

<script>
export default {
  name: "TabBarItem",
  props:{
    path:String,
    activecolor:{
      type:String,
      default:'red',
    }
  },
  data() {
    return {
      // isActive: true
    };
  },
  computed: {
    isActive(){
      return this.$route.path.indexOf(this.path) !== -1  //判断活跃的path是不是传过来的path
    },
    activestyle(){
      return this.isActive?{color:this.activecolor}:{}
    }
  },
  methods: {
    itemClick(){
      this.$router.push(this.path).catch(()=>{console.log("hahah,不报错了")})
      // catch(()=>{})解决冗余导航报错：重复点击报错
    }
  },
};
</script>

<style scoped>
.tab-bar-item {
  flex: 1;
  text-align: center;
  height: 49px;
  font-size: 14px;
}

.tab-bar-item img {
  width: 24px;
  height: 24px;
  margin-top: 3px;
  /* 去除图片底部空白3px */
  vertical-align: middle;
  margin-bottom: 2px;
}
</style>