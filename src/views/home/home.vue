<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control
      :titles="['流行','新款','精选']"
      @tabClick="tabClick"
      ref="tabControl1"
      class="tab-control"
      v-show="isTabFixed"
    />
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @scroll="contentScroll"
      :pull-up-load="true"
      @pullingUp="loadMore"
    >
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"/>
      <recommend-view :recommends="recommends" />
      <feature-view />
      <tab-control :titles="['流行','新款','精选']" @tabClick="tabClick" ref="tabControl2" />
      <goods-list :goods="showGoods" />
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop" />
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar"; //nabbar组件
import TabControl from "components/content/tabControl/TabControl"; //tabcontrol组件
import GoodsList from "components/content/goods/GoodsList";
import Scroll from "components/common/scroll/Scroll";

import HomeSwiper from "./childComps/Homeswiper";
import RecommendView from "./childComps/RecommendView";
import FeatureView from "./childComps/FeatureView";

import {debounce } from "common/utils";
import {itemListenerMixin, backTopMixin} from "common/mixin";
import {getHomeMultidata, getHomeGoods } from "network/home"; //获取数据
import {NEW, POP, SELL} from "common/const"; //获取常量

export default {
  name: "Home",
  components: {
    NavBar,
    TabControl,
    HomeSwiper,
    RecommendView,
    FeatureView,
    GoodsList,
    Scroll,
  },
  mixins:[itemListenerMixin, backTopMixin],
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] }
      },
      currentType: POP,
      tabOffsetTop: 0,
      isTabFixed: false,
      saveY:0,
    };
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    }
  },

  // 进入Home事件
  activated() {
    this.$refs.scroll.scrollTo(0,this.saveY)
    this.$refs.scroll.refresh()
  },

  // 离开Home事件
  deactivated() {
    // 1.保存Y
    this.saveY = this.$refs.scroll.getScrollY()
    // 2.取消全局事件的监听
    this.$bus.$off('itemImageLoad',this.itemListener)
  },

  // 创建Homes事件
  created() {
    //组件创建好即发送网络请求
    // 1.请求轮播图数据
    this.getHomeMultidata();
    // 2.商品数据
    this.getHomeGoods(POP);
    this.getHomeGoods(NEW);
    this.getHomeGoods(SELL);
  },
  // 挂载Home事件
  mounted() {
  },
  methods: {
    /*
      事件监听相关方法
    */
    tabClick(index) {
      switch (index) {
        case 0:
            this.currentType = POP
            break
          case 1:
            this.currentType = NEW
            break
          case 2:
            this.currentType = SELL
            break
      }
      this.$refs.tabControl1.currentIndex = index
      this.$refs.tabControl2.currentIndex = index
    },
    contentScroll(position) {
      // 判断backTop是否显示
      this.listShowBackTop(position)

      //绝对tabControl是否吸顶(position:fixed)
      this.isTabFixed = -position.y > this.tabOffsetTop;
    },
    loadMore() {
      this.getHomeGoods(this.currentType);
    },
    swiperImageLoad() {
      // 监听轮播图加载完成，获取tabControl的offsetTop
      // 所有的组件都有一个属性$el，用于获取组件中的元素
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
    },
    /*
      网络请求相关方法
    */

    getHomeMultidata() {
      getHomeMultidata().then(res => {
        (this.banners = res.data.banner.list),
          (this.recommends = res.data.recommend.list);
      });
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then(res => {
        this.goods[type].list.push(...res.data.list); //或者遍历添加
        // this.goods[type].list.concat(res.data.list); //不行
        this.goods[type].page += 1;
        this.$refs.scroll.finishPullUp();
      });
    }
  }
};
</script>

<style scoped>
#home {
  /* 当home-nav开启fixed这个就不要padding-top */
  /* padding-top: 44px; */
  height: 100vh;
  /* position: relative; */
}
.home-nav {
  background-color: var(--color-tint);
  color: white;
  /* 在使用浏览器原生滚动，为了让导航不跟随一起滚动，使用BScroll后就变成局部滚动了，就不需要了 */
  /* position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9;当scroll */
}
.content {
  /* height: 300px; */
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
/* .content {
  height: calc(100% - 93px);
  overflow: hidden;
  margin-top:44px ;
} */
.tab-control {
  position: relative;
  z-index: 9;
}
</style>