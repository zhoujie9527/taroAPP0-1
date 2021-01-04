import React, { useEffect, useState } from 'react'
import { Image, View } from '@tarojs/components'
import { GoodsFooter } from '@components'
import { getWindowHeight } from '@utils/style'
import './index.scss'

export default function GoodsDetail(props) {
  const [data, setData] = useState({})

  useEffect(()=>{
    if(props?.data) {
      setData(JSON.parse(props?.data));
    }
  },[])

  return (
    <View className="goods" style={{ height: getWindowHeight() }}>
      <Image className="goods-pic" src={data?.categoryItem?.scenePicUrl || ''} />
      <View className="goods-title">{data?.categoryItem?.name || ''}</View>
      <View className="goods-price">￥{data?.categoryItem?.retailPrice || ''}</View>
      <View className="goods-footer">
      <GoodsFooter data={data} />
      </View>
    </View>
  )
}