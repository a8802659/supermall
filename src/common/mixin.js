import {debounce} from './utils'

import {BACKTOP_DISTANCE} from "common/const";
import BackTop from "components/content/backTop/BackTop";

export const itemListenerMixin ={
  data() {
    return {
      itemListener:null,
      newRefresh:null
    }
  },
  mounted() {
    // 图片加载完成的事件监听
    this.newRefresh = debounce(this.$refs.scroll.refresh, 100);
   // 对监听的事件进行保存
    this.itemListener=() => {
      // 代码执行频率有点高
      this.newRefresh();
    }
    // 组件挂载好立刻监听事件总线的图片加载完成事件
    this.$bus.$on("itemImageLoad", this.itemListener);
  },
  
}

export const backTopMixin = {
  data() {
    return {
      isShowBackTop: false   
    }
  },
  components:{
    BackTop
  },
  methods: {
    backClick() {
      this.$refs.scroll.scrollTo(0, 0);
    },
    listShowBackTop(position){
      this.isShowBackTop = -position.y >= BACKTOP_DISTANCE;
    }
  },
}