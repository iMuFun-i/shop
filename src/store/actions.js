const actions = {
  addCart(context, info) {
    return new Promise((reslove, reject) => {
      // 1.查看是否存在当前商品
      const oldInfo = context.state.cartList.find(item => item.iid === info.iid)

      // 2.存在则商品数量 +1，否则添加该商品
      if (oldInfo) {
        context.commit('addCounter', oldInfo)
        reslove('商品数量+1')
      } else {
        info.count = 1
        info.checked = true
        context.commit('addInfo', info)
        reslove('添加了新的商品')
      }
    })
  }
}

export default actions

