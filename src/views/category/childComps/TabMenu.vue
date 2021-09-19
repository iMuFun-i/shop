<template>
  <div class="menu-list">
    <div class="menu-list-item"
         :class="{active: index===currentIndex}"
         v-for="(item, index) in categories"
         :key="item.title"
         @click="itemClick(index)">
      {{item.title}}
    </div>
  </div>
</template>

<script>
  import Scroll from 'common/scroll/Scroll'

	export default {
		name: "TabMenu",
    data() {
		  return {
		    currentIndex: 0
      }
    },
    props: {
		  categories: {
        type: Array,
        default() {
          return []
        }
      }
    },
    components: {
		  Scroll
    },
    methods: {
		  itemClick(index) {
        this.currentIndex = index
        this.$emit('selectItem', index)
      }
    }
	}
</script>

<style scoped>
  .menu-list {
    background-color: #f6f6f6;
  }

  .menu-list-item {
    height: 45px;
    line-height: 45px;
    text-align: center;
    font-size: 14px;
  }

  .menu-list-item.active {
    font-weight: 700;
    color: var(--color-high-text);
    background-color: #fff;
    border-left: 3px solid var(--color-high-text);
  }
</style>
