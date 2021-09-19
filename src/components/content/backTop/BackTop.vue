<template>
  <div class="back-top" @click="topClick">
    <img src="~assets/img/common/top.png" alt="">
  </div>
</template>

<script>
	export default {
		name: "BackTop",
    methods: {
		  topClick: function () {
        this.$emit('backTop');
      }
    }
	}
</script>

<style scoped>
  .back-top {
    position: fixed;
    right: 10px;
    bottom: 60px;
  }

  .back-top img {
    width: 52px;
    height: 52px;
  }
</style>
