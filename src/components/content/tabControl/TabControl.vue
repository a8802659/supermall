<template>
  <div class="tab-control">
    <div v-for="(item,index) in titles" :key='index' 
          class="tab-control-item"
          :class="{active:index === currentIndex}" 
          @click="itemClick(index)">
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name:'TabControl',
  props:{
    titles:{
      type:Array,
      default(){
        return []
      }
    }
  },
  data() {
    return {
      currentIndex:0
    }
  },
  methods: {
    itemClick(index){
       // 1.改变currentIndex
      this.currentIndex=index
      // 2.发出事件
      this.$emit('tabClick',index)
    }
  },
}
</script>

<style scoped>
.tab-control {
  display: flex;
  text-align: center;
  font-size: 15px;
  height: 40px;
  line-height: 40px;
  background-color: #fff;
  z-index: 9;
}
.tab-control-item {
  flex: 1;
}
.tab-control span {
  padding: 5px;
}
.active{
  color: var(--color-high-text);
}
.active span{
  border-bottom: 2px solid var(--color-tint);
}
</style>