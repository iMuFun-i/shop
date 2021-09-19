<template>
  <div class="content-detail">
    <goods-list :goods-list="categoryDetail" />
  </div>
</template>

<script>
  import GoodsList from 'content/goods/GoodsList'

  export default {
    name: "TabContentDetail",
    components: {
      GoodsList
    },
    props: {
      categoryDetail: {
        type: Array,
        default() {
          return []
        }
      }
    }
  }
</script>

<style scoped>

</style>
