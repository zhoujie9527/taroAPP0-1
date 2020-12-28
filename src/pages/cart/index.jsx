import React, { useEffect, useState } from 'react'
import { View, Text } from '@tarojs/components'
import { useRouter } from '@tarojs/taro'
import './index.scss'
import { AtButton } from 'taro-ui'

// 购物车
export default function Cart() {
  const [islogin, setIslogin] = useState(false)
  
  const router = useRouter()
  const { params } = router

  useEffect(()=> {
    console.log('router', params)
  },[])

  return (
    <View className="cart">
      {
        islogin ?
        <View>
          <Text>欢迎您</Text>
        </View>
        :
        <View className="cart-login">
          <Text>您尚未登录</Text>
          <AtButton type='primary' onClick={()=> setIslogin(true)}>登录</AtButton>
        </View>
      }
    </View>
  )
}