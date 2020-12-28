import React, { useEffect, useState } from 'react'
import { View, Text } from '@tarojs/components'
import './index.scss'
import { useRouter } from '@tarojs/taro'
import { GoodsDetail } from '@components'

export default function Post() {
  
  const router = useRouter()
  const { params } = router

  useEffect(()=> {
    console.log('router', params)
  },[])

  return (
    <View className="post">
      <GoodsDetail data={params.data}/>
    </View>
  )
}