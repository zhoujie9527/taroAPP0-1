import React, { useEffect, useState } from 'react'
import { View } from '@tarojs/components'
import './index.scss'

export default function GoodsDetail(props) {
  const [data, setData] = useState({})

  useEffect(()=>{
    setData(JSON.parse(props.data));
    console.log('props',JSON.parse(props.data))
  },[])

  return (
    <View className="postcard">
      <View className="post-title">商品描述：{data?.categoryItem?.name || ''}</View>
      <View className="post-content">商品ID：{data?.id || ''}</View>
    </View>
  )
}