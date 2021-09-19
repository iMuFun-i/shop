const mutations = {
  addCounter(state, oldInfo) {
    oldInfo.count++
  },
  addInfo(state, newInfo) {
    state.cartList.push(newInfo)
  }
}

export default mutations

