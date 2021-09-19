<template>
  <div id="profile">
    <nav-bar class="nav-bar"><div slot="center">我的</div></nav-bar>
    <user-info/>
    <account-info :account-info="accountInfo"/>
    <list-view :list-data="orderList" class="order-list"></list-view>
    <list-view :list-data="serviceList" class="service-list"></list-view>
  </div>
</template>

<script>
  import NavBar from 'common/navbar/NavBar'
  import AccountInfo from './childComps/AccountInfo'
  import UserInfo from './childComps/UserInfo'
  import ListView from './childComps/ListView'

	export default {
		name: "Profile",
    components: {
		  NavBar,
      AccountInfo,
      UserInfo, 
      ListView
    },
    data: function () {
		  return {
        accountInfo: {
          balance: 0.00, 
          discount: 0, 
          points: 0
        },
		    orderList: [
          {icon: '#order', iconColor: '#ff8198', info: '我的消息'},
          {icon: '#point', iconColor: '#fc7b53', info: '积分商城'},
          {icon: '#vip', iconColor: '#ffc636', info: '会员卡'},
        ],
        serviceList: [
          {icon: '#service', iconColor: '#ff8198', info: '我的购物车'},
          {icon: '#download', iconColor: '#ff8198', info: '下载购物APP'},
        ]
      }
    }
	}
</script>

<style scoped>
  #profile {
    background-color: #f2f2f2;
  }

  .nav-bar {
    background-color: var(--color-tint);
    font-weight: 700;
    color: #fff;
  }

  .order-list, 
  .service-list {
    margin-top: 12px;
  }

</style>
