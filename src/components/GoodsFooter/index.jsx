import React, { useEffect, useState } from 'react'
import Taro from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import homeIcon from './assets/home.png'
import serviceIcon from './assets/service.png'
import cartIcon from './assets/cart.png'
import './index.scss'
import { AtButton, AtMessage } from 'taro-ui'

const NAV_LIST = [{
  key: 'home',
  img: homeIcon,
  url: '/pages/home/home'
}, {
  key: 'service',
  img: serviceIcon
}, {
  key: 'cart',
  img: cartIcon,
  url: '/pages/cart/cart'
}]


export default function GoodsFooter(props) {

  function linkTo(tip) {
    if(tip === 'home') {
      Taro.navigateBack()
    }else if(tip === 'service') {
      Taro.atMessage({
        type: 'info',
        message: '敬请期待',
      })
    } else {
      shopping()
    }
  }

  function toBuy() {
      Taro.atMessage({
        type: 'info',
        message: '敬请期待',
      })
  }

  function shopping() {
    console.log(props.data)
    Taro.switchTab({
      url: `/pages/cart/index`
    })
  }

  return (
    <View className='goods-footer'>
    <AtMessage />
    {NAV_LIST.map(item => (
      <View
        key={item.key}
        className='at-col at-col-1'
        onClick={()=>linkTo(item.key)}
      >
        <Image
          className='goods-footer-img'
          src={item.img}
        />
      </View>
    ))}
    <AtButton size='small' className='at-col at-col-4' onClick={()=>toBuy()}>立即购买</AtButton>
    <AtButton size='small' type='primary' className='at-col at-col-5' onClick={()=>shopping()}>加入购物车</AtButton>
  </View>
  )
}


