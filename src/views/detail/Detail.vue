<template>
  <div id="detail">
    <!-- 导航栏 -->
    <detail-nav-bar @titleClick="titleClick" ref="detailnav" />
    <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll">
      <!-- 轮播图 -->
      <detail-swiper :top-images="topImages"></detail-swiper>
      <!-- BaseInfo -->
      <detail-base-info :goods="goods"></detail-base-info>
      <!-- 店铺信息 -->
      <detail-shop-info :shop="shop"></detail-shop-info>
      <!-- 商品图片 -->
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
      <!-- 参数信息 -->
      <detail-param-info :param-info="paramInfo" ref="param" />
      <!-- 评论 -->
      <detail-comment-info :comment-info="commentInfo" ref="comment" />
      <!-- 推荐商品 -->
      <goods-list :goods="recommends" ref="recommends"></goods-list>

    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop" />
    <detail-bottom-bar @addToCart="addToCart"/>
    <!-- <toast :message="message" :show="show"/> -->
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar";
import DetailSwiper from "./childComps/DetailSwiper";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailShopInfo from "./childComps/DetailShopInfo";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
import DetailParamInfo from "./childComps/DetailParamInfo";
import DetailCommentInfo from "./childComps/DetailCommentInfo";
import DetailBottomBar from './childComps/DetailBottomBar';

import GoodsList from "components/content/goods/GoodsList";
import Scroll from "components/common/scroll/Scroll";
// import Toast from '../../components/common/toast/Toast'
import { debounce } from "common/utils";
import {itemListenerMixin, backTopMixin} from "common/mixin";
import { mapActions } from "vuex"

import {
  getDetail,
  Goods,
  Shop,
  GoodsParam,
  getRecommend
} from "network/detail";

export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    GoodsList,
    DetailBottomBar,
    // Toast
  },
  mixins: [itemListenerMixin,backTopMixin],
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      themeTopYs: [],
      getThemeTopYs: null,
      currentIndex: 0,
      // message:'',
      // show:false
    };
  },
  created() {
    // 1.保存传入的iid
    this.iid = this.$route.params.iid;
    // this.iid = this.$route.query.iid;

    // 2.根据iid请求详情数据
    getDetail(this.iid).then(res => {
      // console.log(res)
      // 1.提取需要的数据
      const data = res.result;
      // 2.获取顶部轮播图片的数据
      this.topImages = data.itemInfo.topImages;
      // 3.获取商品信息
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );
      // 4.店铺信息
      this.shop = new Shop(data.shopInfo);
      // 5.保存商品的详情数据
      this.detailInfo = data.detailInfo;
      // 6.获取GoodsParam
      this.paramInfo = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      );
      // 7.取出评论信息
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0];
      }
      // 8在前面的数据渲染结束后来回调this.$nextTick中的函数
      // 虽然这个函数可以获取到值，但是值不是图片渲染完的值，是渲染完DOM的值
      // this.$nextTick(() => {
      //   this.themeTopYs = [];
      //   //请求后获得标题对应的offsetTop
      //   this.themeTopYs.push(0);
      //   this.themeTopYs.push(this.$refs.param.$el.offsetTop);
      //   this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      //   this.themeTopYs.push(this.$refs.recommends.$el.offsetTop);
      //   console.log(this.themeTopYs);
      // });
    });
    // 3.请求推荐数据
    getRecommend().then(res => {
      this.recommends = res.data.list;
    });
    // 4.给getThemeTopYs赋值防抖函数，
    this.getThemeTopYs = debounce(() => {
      this.themeTopYs = [];
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.param.$el.offsetTop);
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      this.themeTopYs.push(this.$refs.recommends.$el.offsetTop);
      this.themeTopYs.push(Number.MAX_VALUE);
    }, 100);
  },
  mounted() {},
  updated() {
    //   updated会执行多次，所以在开始就将容器清空后再将offsetTop存入
    //   this.themeTopYs = [];
    // //   更新后获得标题对应的offsetTop，但是不一定图片已经渲染完了
    //   this.themeTopYs.push(0);
    //   this.themeTopYs.push(this.$refs.param.$el.offsetTop);
    //   this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
    //   this.themeTopYs.push(this.$refs.recommends.$el.offsetTop);
    //   console.log(this.themeTopYs)
  },
  destroyed() {
    this.$bus.$off("itemImageLoad", this.itemListener);
  },
  methods: {
    ...mapActions(['addCart']),
    imageLoad() {
      // 1.图片加载完成，更新Bscroll的高度
      this.newRefresh();
      // this.$refs.scroll.refresh();

      // 2.图片加载完成获取Theme的高度
      this.getThemeTopYs();
    },
    titleClick(index) {
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 200);
    },
    contentScroll(position) {
      // 1.获取y值
      const positionY = -position.y;
      let length = this.themeTopYs.length;
      // 2.positionY和主题中的值进行对比，决定显示的index
      for (let i = 0; i < length-1; i++) {
        // if (
        //   this.currentIndex !== i &&
        //     ((i < length - 1 &&
        //       positionY >= this.themeTopYs[i] &&
        //       positionY < this.themeTopYs[i + 1]) ||
        //   (i === length-1 && positionY >= this.themeTopYs[i]))
        // ) {
        //   this.currentIndex = i;
        //   // console.log(this.currentIndex);
        //   this.$refs.detailnav.currentIndex = this.currentIndex
        // }
        // 代码优化，在themeTopYs后面添加一个非常大的值
        if (
          this.currentIndex !== i &&
          positionY >= this.themeTopYs[i] &&  
          positionY < this.themeTopYs[i + 1]
        ) {
          this.currentIndex = i;
          this.$refs.detailnav.currentIndex = this.currentIndex;
        }
      }
      // 3.改变isShowBackTop-判断显示回顶
      this.listShowBackTop(position)  
    },
    addToCart() {
      // 1.获取购物车需要的信息
      const product = {}
      product.image = this.topImages[0]
      product.title = this.goods.itemInfo
      product.desc = this.goods.desc
      product.price = this.goods.nowPrice
      product.iid = this.iid

      // 2.将商品添加到购物车中
      //  2.1到mutations中
      // this.$store.commit('addCart',product)
      //  2.2到actions中
      // 方式一：
      // this.$store.dispatch('addCart',product).then(res => {
      //   console.log(res)
      // })
      // 方式二：利用mapActions直接引用addCart
      this.addCart(product).then(res => {
        // this.show = true
        // this.message = res
        // setTimeout(() => {
        //   this.show = false
        //   this.message = ''
        // },1500)
        this.$toast.show(res,1500)
      })

      // 3.将商品添加到购物车
    }
  }
};
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 9;
  background-color: #ffffff;
  height: 100vh;
}
.detail-nav {
  position: relative;
  z-index: 9;
  background-color: #ffffff;
}
.content {
  height: calc(100% - 45px - 49px);
  overflow: hidden;
}
</style>