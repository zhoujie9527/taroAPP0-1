import { observable } from 'mobx'

const appStore = observable({
  counter: 0,
  cartInfo: [],

  updateCart(data) {
    console.log('updateCart', data)
    this.cartInfo = data;
  },

  counterStore() {
    this.counter++
  },
  increment() {
    this.counter++
  },
  decrement() {
    this.counter--
  },
  incrementAsync() {
    setTimeout(() => {
      this.counter++
    }, 1000)
  }
})

export default appStore