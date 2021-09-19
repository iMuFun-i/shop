<template>
    <div>
      <div class="icon-selector" @click="selectItem">
        <i class="iconfont icon-choice" v-if="!checked"></i>
        <i class="iconfont icon-choice-full" v-else></i>
      </div>
    </div>
</template>

<script>
	export default {
		name: "CheckButton",
    props: {
		  value: {
		    type: Boolean,
        default: true
      }
    },
    data() {
		  return {
		    checked: this.value
      }
    },
    methods: {
      selectItem() {
        this.$emit('checkBtnClick')
      }
    },
    watch: {
		  value(newValue) {
        this.checked = newValue;
      }
    }
	}
</script>

<style scoped>
  .icon-selector {
    position: relative;
    margin: 0;
    width: 18px;
    height: 18px;
    cursor: pointer;
  }
</style>
