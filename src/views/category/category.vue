<template>
 
</template>

<script>
import BScroll from 'better-scroll'
export default {
  name:'Categroy',
  data() {
    return {
      scroll:null
    }
  },
  created() {
    // created 中找.wrapper是找不到的，因为创建组件，但是template是还没挂载的
    // // new BScroll(document.querySelector('.wrapper'))
    // this.scroll =new BScroll(document.querySelector('.wrapper'),{
    // })
  },
  // mounted() {
  //   this.scroll =new BScroll(document.querySelector('.wrapper'),{
  //     probeType:3,
  //     pullUpLoad:true
  //   })
  //   this.scroll.on('scroll',(position)=>{
  //     console.log(position)
  //   })
  //   this.scroll.on('pullingUp',()=>{
  //     console.log('上拉加载更多')
  //   })
  // },
  // methods: {
  //   btnClick(){
  //     console.log("btnClick")
  //   }
  // },
}
</script>

<style scoped>
.wrapper{
  height: 150px;
  background-color: red;
  overflow: hidden;
  /* overflow-y: scroll; */
}
</style>