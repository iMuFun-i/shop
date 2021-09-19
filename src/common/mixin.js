import { POP, NEW, SELL } from "./const";
import TabControl from 'content/tabControl/TabControl';

import BackTop from 'content/backTop/BackTop';
import { BACKTOP_DISTANCE } from "@/common/const";

import { debounce } from "@/common/utils";

export const backTopMixin = {
  data() {
    return {
      showBackTop: false
    }
  },
  components: {
    BackTop
  },
  methods: {
    isShowBackTop(position) {
      this.showBackTop = position.y <= -BACKTOP_DISTANCE
    },
    backTop() {
      this.$refs.scroll.scrollTo(0, 0, 300);
    }
  }
}

export const scrollRefresh = {
  data() {
    return {
      refresh: null
    }
  },
  mounted() {
    this.refresh = debounce(this.$refs.scroll.refresh, 50)
  }
}

export const tabControlMixin = {
  data() {
    return {
      currentType: POP
    }
  },
  components: {
    TabControl,
  },
  methods: {
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
    }
  }
}
