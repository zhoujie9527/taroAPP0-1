export default {
  pages: [
    'pages/home/index',
    'pages/mine/mine', 
    'pages/index/index',
    'pages/parts/index',
    'pages/post/post',
    'pages/cart/index'
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  },
  tabBar: {
    list: [
      {
        pagePath: 'pages/home/index',
        text: '首页',
        iconPath: './images/home.png',
        selectedIconPath: './images/homeSelected.png',
      },
      {
        pagePath: 'pages/parts/index',
        text: '分类',
        iconPath: './images/parts.png',
        selectedIconPath: './images/partsSelected.png',
      },
      {
        pagePath: 'pages/cart/index',
        text: '购物车',
        iconPath: './images/cart.png',
        selectedIconPath: './images/cartSelected.png',
      },
      {
        pagePath: 'pages/mine/mine',
        text: '我的',
        iconPath: './images/mine.png',
        selectedIconPath: './images/mineSelected.png',
      },
    ],
  },
}
