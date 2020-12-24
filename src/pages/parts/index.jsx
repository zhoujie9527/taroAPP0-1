import React, { useEffect, useState } from 'react'
import { View, Text } from '@tarojs/components'
import { AtTabs, AtTabsPane } from 'taro-ui'
import { HomeApi, HomeScrollApi } from '@utils/api'
import fetch from '@utils/request'
import { getWindowHeight } from '@utils/style'
import './index.scss'

export default function Parts() {
    const [current, setCurrent] = useState(0)
    const [dataSource, setDataSource] = useState([])
    const [menuList, setMenuList] = useState([])

  useEffect(()=> {
    fetch({ url: HomeApi, method: 'GET' }).then((res)=> {
        console.log('res', res)
        setDataSource(res)
        let list = []
        res?.kingKongAreaV5.map(item=> {
            if(item?.payload?.type === 1) {
                list.push({
                    title: item?.title || '--'
                })
            }
        }) 
        setMenuList(list)
    }).catch(err=> {
        console.log('err', err)
    })
  },[])

  function handleClick(params) {
      setCurrent(params)
  }

  return (
    <View className="parts">
      <AtTabs
        current={current}
        height={getWindowHeight()}
        scroll
        tabDirection='vertical'
        tabList={menuList}
        onClick={(e)=>handleClick(e)}>
            {
                menuList?.map((item,index) => {
                    return <AtTabsPane tabDirection='vertical' current={current} index={index}>
                        <View style='font-size:18px;text-align:center;height:200px;'>{item?.title || '--'}</View>
                        <View style={{ textAlign: 'center', color: '#DDD' }}>内容开发中...</View>
                    </AtTabsPane>
                })
            }
        </AtTabs>
    </View>
  )
}