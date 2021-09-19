<template>
  <div class="content-category">
    <div class="item" v-for="item in subcategories.list" :key="item.link">
      <a :href="item.link">
        <img class="item-img" :src="item.image" alt="">
        <div class="item-text">{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
  export default {
    name: "TabContentCategory",
    props: {
      subcategories: {
        type: Object,
        default() {
          return []
        }
      }
    }
  }
</script>

<style scoped>
  .content-category {
    display: flex;
    flex-wrap: wrap;
    padding: 20px 6px 5px;
  }

  .item {
    width: 33%;
    margin-bottom: 15px;
    text-align: center;
    font-size: 12px;
  }

  .item a {
    display: block;
  }

  .item-img {
    width: 80%;
  }

  .item-text {
    margin-top: 15px;
  }
</style>
