<template>
  <div id="detail">
    <detail-nav-bar @itemClick="titleClick" :current-index="currentIndex"/>
    <scroll class="content"
            ref="scroll"
            :probe-type="3"
            @scroll="contentScroll">
      <div>
        <detail-swiper ref="base" :images="topImages"/>
        <detail-base-info :goods="goods"/>
        <detail-shop-info :shop="shop"/>
        <detail-goods-info :detail-info="detailInfo" @detailImgLoad="detailImgLoad"/>
        <detail-param-info ref="param" :param-info="paramInfo"/>
        <detail-comment-info ref="comment" :comment-info="commentInfo"/>
        <detail-recommend-info ref="recommend" :recommend-list="recommendList"/>
      </div>
    </scroll>
    <detail-bottom-bar @addToCart="addToCart"/>
    <back-top @backTop="backTop" class="back-top" v-show="showBackTop"/>
  </div>
</template>

<script>
  import Scroll from 'common/scroll/Scroll'
  import { mapActions } from 'vuex'

  import DetailNavBar from './childComps/DetailNavBar'
  import DetailSwiper from './childComps/DetailSwiper'
  import DetailBaseInfo from './childComps/DetailBaseInfo'
  import DetailShopInfo from './childComps/DetailShopInfo'
  import DetailGoodsInfo from './childComps/DetailGoodsInfo'
  import DetailParamInfo from './childComps/DetailParamInfo'
  import DetailCommentInfo from './childComps/DetailCommentInfo'
  import DetailRecommendInfo from './childComps/DetailRecommendInfo'
  import DetailBottomBar from './childComps/DetailBottomBar'

  import { getDetail, getRecommend, Goods, Shop, GoodsParam } from "network/detail";
  import { backTopMixin, scrollRefresh } from "@/common/mixin";

  export default {
		name: "Detail",
    components: {
      Scroll,
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      DetailRecommendInfo,
      DetailBottomBar,
    },
    mixins: [backTopMixin, scrollRefresh],
    data() {
		  return {
		    iid: '',
		    topImages: [],
        goods: {},
        shop: {},
        detailInfo: {},
        paramInfo: {},
        commentInfo: {},
        recommendList: [],
        themeTops: [],
        currentIndex: 0
      }
    },
    created() {
		  this._getDetailData()
      this._getRecommend()
    },
    mounted() {
      this.$bus.$on('itemImgLoad', this.refresh)
    },
    methods: {
      ...mapActions(['addCart']),

      detailImgLoad() {
        this.getOffsetTops()
      },
		  getOffsetTops() {
		    this.themeTops = []
        this.themeTops.push(this.$refs.base.$el.offsetTop)
        this.themeTops.push(this.$refs.param.$el.offsetTop)
        this.themeTops.push(this.$refs.comment.$el.offsetTop)
        this.themeTops.push(this.$refs.recommend.$el.offsetTop)
        this.themeTops.push(Number.MAX_VALUE)
      },
      contentScroll(position) {
		    // 1.监听backTop的显示
        this.isShowBackTop(position)

        // 2.监听滚动到哪一个主题
        this.listenScrollTheme(-position.y)
      },
      listenScrollTheme(position) {
        let length = this.themeTops.length;
        for (let i = 0; i < length; i++) {
          let iPos = this.themeTops[i];
          if (this.currentIndex !== i && position >= iPos && position < this.themeTops[i+1]) {
            this.currentIndex = i;
          }
        }
      },
      titleClick(index) {
        this.$refs.scroll.scrollTo(0, -this.themeTops[index], 100)
      },
      addToCart() {
        // 1.创建对象
        const obj = {}
        // 2.对象信息
        obj.iid = this.iid;
        obj.imgURL = this.topImages[0]
        obj.title = this.goods.title
        obj.desc = this.goods.desc;
        obj.newPrice = this.goods.nowPrice;
        // 3.添加到Store中
        this.addCart(obj).then((res) => {
          this.$toast.show(res)
        })
      },
		  _getDetailData() {
		    // 1.获取iid
        const iid = this.$route.query.iid
        this.iid = iid

        // 2.请求数据
        getDetail(iid).then(res => {
          // 2.1.获取结果
          const data = res.result;

          // 2.2.获取顶部信息
          this.topImages = data.itemInfo.topImages;

          // 2.3.获取商品信息
          this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services);

          // 2.4.获取店铺信息
          this.shop = new Shop(data.shopInfo);

          // 2.5.获取商品信息
          this.detailInfo = data.detailInfo

          // 2.6.保存参数信息
          this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule);

          // 2.7.保存评论信息
          if (data.rate.list) {
            this.commentInfo = data.rate.list[0];
          }
        })
      },
      _getRecommend() {
        getRecommend().then((res, error) => {
          if (error) return
          this.recommendList = res.data.list
        })
      }
    }
	}
</script>

<style scoped>
  #detail {
    height: 100vh;
    position: relative;
    z-index: 1;
    background-color: #fff;
  }

  .content {
    position: absolute;
    top: 44px;
    bottom: 60px;
  }
</style>
