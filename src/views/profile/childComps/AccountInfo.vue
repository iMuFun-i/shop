<template>
  <section class="account">
      <div class="account-item">
        <div class="number">
          <span class="balance">{{ accountInfo.balance }}</span>元
        </div>
        <div class="account-info">我的余额</div>
      </div>
      <div class="account-item">
        <div class="number">
          <span class="balance">{{ accountInfo.discount }}</span>个
        </div>
        <div class="account-info">我的优惠</div>
      </div>
      <div class="account-item">
        <div class="number">
          <span class="balance">{{ accountInfo.points }}</span>分
        </div>
        <div class="account-info">我的积分</div>
      </div>
    </section>
</template>

<script>
  export default {
    props: {
      accountInfo: {
        type: Object,
        default() {
          return {}
        }
      }
    }
  }
</script>

<style>
  .account {
    display: flex;
  }

  .account-item {
    width: 100%;
    background-color: #fff;
    margin-right: 1px;
    text-align: center;
  }

  .account-item:last-of-type {
    margin-right: 0;
  }

  .account-item {
    color: #666;
    font-size: 13px;
    padding: 18px;
  }

  .account-item .balance {
    font-size: 24px;
    font-weight: 700;
    color: #ff5f3e;
  }

  .account-info {
    margin-top: 6px;
  }
</style>