import React, { useEffect, useState } from 'react'
import { View, Button, Text, Image, Radio } from '@tarojs/components'
import { observer, inject } from 'mobx-react'
import { AtButton, AtCheckbox, AtInputNumber } from 'taro-ui'
import Taro from '@tarojs/taro'
import empty from './imgs/empty.png'
import './index.scss'

function Cart(props) {
    const [islogin, setIslogin] = useState(false);
    const [dataSource, setDataSource] = useState({});
    const [checkedList, setCheckedList] = useState([]);

    useEffect(()=> {
      const data = props?.store?.appStore;
      let sum = 0;
      data?.cartInfo?.map(item=> {
        item?.sum ? sum += item?.sum :''
      })
      if(sum > 0) {
        Taro.setTabBarBadge({
          index: 2,
          text: `${sum}`
        })
      }
      console.log('sum', sum)
      setDataSource(data)
    },[props.store.appStore.cartInfo])

    function handleChange(params) {
      console.log('handleChange', params)
      setCheckedList(params)
    }

    function sumChange(num, id) {
      let data = dataSource
      data?.cartInfo?.map((item, index)=> {
        if(item?.id === id) {
          data.cartInfo[index].sum = num;
        }
      })
      props.store.appStore = data
      let sum = 0;
      data?.cartInfo?.map(item=> {
        item?.sum ? sum += item?.sum :''
      })
      if(sum > 0) {
        Taro.setTabBarBadge({
          index: 2,
          text: `${sum}`
        })
      }
    }

    // function checkChange(e, id) {
    //   console.log(e, id)
    // }

    return (
      <View className="cart">
      {
        islogin ?
        <>
          {
            dataSource?.cartInfo?.length > 0 ?
            dataSource?.cartInfo?.map((item, index)=> {
              return (
                <View key={item?.id} className='cart-row'>
                <View className='at-row at-row__align--center'>
                    <View className='at-col at-col-1'>
                      <View style={{marginLeft: '-8px'}}>
                      <AtCheckbox options={[{value: item?.id}]} selectedList={checkedList} onChange={(e)=> handleChange(e)} />
                        {/* <Radio value={item?.id} checked={checkedList.find(info=> info.id===item.id)?.checked} /> */}
                      </View>
                    </View>
                    <View className='at-col at-col-3'>
                      <Image className="cart-img" src={item?.categoryItem?.listPicUrl} alt='' />
                    </View>
                    <View className='at-col at-col-8'>
                      <View className="cart-title">{item?.categoryItem?.name || '--'}</View>
                      <View className="cart-footer" >
                        <View className="cart-footer-price">
                          {item?.categoryItem?.retailPrice}
                        </View>
                        <View className="cart-footer-sum">
                        <AtInputNumber
                          min={1}
                          step={1}
                          value={item?.sum}
                          onChange={(e)=> sumChange(e,item.id)}
                        />
                      </View>
                      </View>
                     
                    </View>
                </View>
                </View>
              )
            })
            :
            <View>
              <Image
                className='cart-empty'
                src={empty}
              />
            </View>
            
          }
        </>
        :
        <View className="cart-login">
          <Text>您尚未登录</Text>
          <AtButton type='primary' onClick={()=> setIslogin(true)}>登录</AtButton>
        </View>
      }
    </View>
    )

}



export default inject('store')(observer(Cart))