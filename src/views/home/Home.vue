<template>
  <div id="home">
    <nav-bar class="nav-bar"><div slot="center">购物街</div></nav-bar>
    <tab-control :titles="['流行', '新款', '精选']"  class="tab-control-top" @itemClick="tabClick" v-show="isTabFixed" ref="tabControl1"/>
    <scroll class="content"
            ref="scroll"
            :probe-type="3"
            @scroll="contentScroll"
            :pull-up-load="true"
            @pullingUp="loadMore">
      <div>
        <home-swiper :banners="banners" ref="hSwiper" @swiperImgLoad="swiperImgLoad"/>
        <feature-view :features="recommends"/>
        <recommend-view/>
        <tab-control :titles="['流行', '新款', '精选']" @itemClick="tabClick" ref="tabControl2"/>
        <goods-list :goods-list="showGoodsList"/>
      </div>
    </scroll>
    <back-top @backTop="backTop" class="back-top" v-show="showBackTop"/>
  </div>
</template>

<script>
  import NavBar from 'common/navbar/NavBar'
  import Scroll from 'common/scroll/Scroll'
  import TabControl from 'content/tabControl/TabControl'
  import GoodsList from 'content/goods/GoodsList'
  import HomeSwiper from './childComps/HomeSwiper'
  import FeatureView from './childComps/FeatureView'
  import RecommendView from './childComps/RecommendView'

  import { getHomeMultidata, getHomeData, RECOMMEND, BANNER } from "network/home";
  import { POP, NEW, SELL } from "@/common/const";
  import { backTopMixin, scrollRefresh } from "@/common/mixin";

  export default {
		name: "Home",
    components: {
		  NavBar,
      Scroll,
      TabControl,
      GoodsList,
      HomeSwiper,
      FeatureView,
      RecommendView,
    },
    mixins: [backTopMixin, scrollRefresh],
    data() {
		  return {
		    banners: [],
        recommends: [],
        goodsList: {
          pop: { page: 1, list: [], currentPosY: 0 },
          new: { page: 1, list: [], currentPosY: 0 },
          sell: { page: 1, list: [], currentPosY: 0 }
        },
        currentType: POP,
        isTabFixed: false,
        tabOffsetTop: 0,
        remPosY: false,
        scrollY: 0
      }
    },
    computed: {
		  showGoodsList() {
		    return this.goodsList[this.currentType].list
      }
    },
    created() {
      // 1.请求多个数据
      this._getMultiData()

      // 2.请求商品数据
      this._getHomeProducts(POP)
      this._getHomeProducts(NEW)
      this._getHomeProducts(SELL)
    },
    mounted() {
      this.$bus.$on('itemImgLoad', this.refresh)
    },
    activated() {
      // 轮播图开始轮播
      this.$refs.hSwiper.startTimer()
      // 开始监听 itemImgLoad 事件
      this.$bus.$on('itemImgLoad', this.refresh)
      // 返回到离开时的位置
      this.refresh()
      this.$refs.scroll.scrollTo(0, this.scrollY, 0)
    },
    deactivated() {
      // 轮播图停止轮播
      this.$refs.hSwiper.stopTimer()
      // 停止监听 itemImgLoad 事件
      this.$bus.$off('itemImgLoad', this.refresh)
      // 记录离开时的位置
      this.scrollY = this.$refs.scroll.getScrollY()
    },
    methods: {
       /**
       * 时间监听相关方法
       */
      swiperImgLoad() {
        this.refresh()
        this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
        Object.keys(this.goodsList).forEach(item => this.goodsList[item].currentPosY = this.tabOffsetTop)
      },
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

        if(this.isTabFixed) {
          this.$refs.scroll.scrollTo(0, -this.goodsList[this.currentType].currentPosY, 0)
        }
      },
      contentScroll(position) {
		    // 1.判断 tabFixed 是否显示
        this.isTabFixed = position.y <= -this.tabOffsetTop

        // 2.判断 backTop 是否显示
        this.isShowBackTop(position)

        // 3.判断是否要记录 currentType 的位置
        if (this.isTabFixed) {
          this.goodsList[this.currentType].currentPosY = -position.y
          this.remPosY = true
        } else {
          if (this.remPosY) {
            Object.keys(this.goodsList).forEach(item => this.goodsList[item].currentPosY = this.tabOffsetTop)
            this.remPosY = false
          }
        }
      },
      loadMore() {
		    this._getHomeProducts(this.currentType)
      },

      /**
       * 网络请求相关方法
       */

      _getMultiData() {
        getHomeMultidata().then(res => {
          this.banners = res.data[BANNER].list
          this.recommends = res.data[RECOMMEND].list
          // this.$nextTick(() => {
          //   this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
          // })
        })
      },
      _getHomeProducts(type) {
        getHomeData(type, this.goodsList[type].page).then(res => {
          const goodsList = res.data.list;
          this.goodsList[type].list.push(...goodsList)
          this.goodsList[type].page += 1

          this.$refs.scroll.finishPullUp()
        })
      }
    }
	}
</script>

<style scoped>
  #home {
    /*position: relative;*/
    height: 100vh;
  }

  .nav-bar {
    background-color: var(--color-tint);
    font-weight: 700;
    color: #fff;
  }

  .content {
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }

  .tab-control-top {
    position: relative;
    z-index: 9;
  }
</style>
