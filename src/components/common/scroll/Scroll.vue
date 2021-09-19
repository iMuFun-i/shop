<template>
  <div ref="wrapper">
    <slot></slot>
  </div>
</template>

<script>
import BScroll from "better-scroll";

export default {
  name: "Scroll",
  props: {
    probeType: {
      type: Number,
      default: 1,
    },
    pullUpLoad: {
      type: Boolean,
      default: false,
    },
    bounce: {
      type: Boolean,
      default: true,
    }
  },
  data() {
    return {
      scroll: {},
    };
  },
  mounted() {
    // 1.初始化BScroll对象
    if (!this.$refs.wrapper) return;
    this.scroll = new BScroll(this.$refs.wrapper, {
      click: true,
      probeType: this.probeType,
      pullUpLoad: this.pullUpLoad,
      bounce: this.bounce,
    });

    // 2.将监听事件回调
    this.scroll.on("scroll", (pos) => {
      this.$emit("scroll", pos);
    });

    // 3.监听上拉到底部
    this.scroll.on("pullingUp", () => {
      this.$emit("pullingUp");
    });
  },
  methods: {
    refresh() {
      // console.log('---');
      this.scroll && this.scroll.refresh && this.scroll.refresh();
    },
    getScrollY() {
      return this.scroll ? this.scroll.y : 0;
    },
    finishPullUp() {
      this.scroll && this.scroll.finishPullUp && this.scroll.finishPullUp();
    },
    scrollTo(x, y, time) {
      this.scroll && this.scroll.scrollTo && this.scroll.scrollTo(x, y, time);
    },
  },
};
</script>

<style scoped>
</style>
