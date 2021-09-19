<template>
  <div class="toast" v-show="isShow">
    <div>{{ message }}</div>
  </div>
</template>

<script>
  export default {
    name: 'Toast',
    data() {
      return {
        message: '',
        isShow: false
      }
    },
    methods: {
      show(message) {
        this.message = message
        this.isShow = true

        setTimeout(() => {
          this.message = ''
          this.isShow = false
        }, 1000)
      }
    }
  }
</script>

<style>
  .toast {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 12px;
    z-index: 10;

    color: #fff;
    background-color: rgba(0, 0, 0, .8);
    border-radius: 6px;
  }
</style>