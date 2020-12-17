export default {
  pages: [
    'pages/home/index',
    'pages/mine/mine', 
    'pages/index/index',
    'pages/post/post'
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
        pagePath: 'pages/mine/mine',
        text: '我的',
        iconPath: './images/mine.png',
        selectedIconPath: './images/mineSelected.png',
      },
    ],
  },
}
