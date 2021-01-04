import React, { useEffect, useState } from 'react'
import { View, Button, Text, Image, Radio } from '@tarojs/components'
import { observer, inject } from 'mobx-react'
import { AtButton, AtCheckbox, AtInputNumber } from 'taro-ui'
import Taro from '@tarojs/taro'
import empty from './imgs/empty.png'
import './index.scss'
import { SingleCheck } from '@components'

function Cart(props) {
    // const [islogin, setIslogin] = useState(false);
    const [dataSource, setDataSource] = useState({});
    const [checkedList, setCheckedList] = useState([]);
    const [timer, setTimer] = useState(0)

    useEffect(()=> {
      const data = props?.store?.appStore;
      let sum = 0;
      data?.cartInfo?.map(item=> {
        item?.sum ? sum += item?.sum :'';
      })

      let statusList = [];
      if(checkedList.length === 0) {
        data?.cartInfo?.map(item=> {
          statusList.push({
            id: item?.id,
            status: false,
          })
        })
      } else {
        statusList = checkedList;
        const len = data?.cartInfo.length;
        statusList.push({
          id: data?.cartInfo[len - 1].id,
          status: false
        })
      }

      setCheckedList(statusList)
      setTimer(Date.now());
      if(props?.store?.appStore?.cartInfo?.totolNum > 0) {
        Taro.setTabBarBadge({
          index: 2,
          text: `${props?.store?.appStore?.cartInfo?.totolNum}`
        })
      }
      console.log('sum', sum)
      setDataSource(data)
    },[ props?.store?.appStore?.cartInfo, props?.store?.appStore?.cartInfo?.totolNum])

    // function handleChange(params) {
    //   console.log('handleChange', params)
    //   setCheckedList(params)
    // }

    function sumChange(num, id) {
      let data = dataSource
      data?.cartInfo?.map((item, index)=> {
        if(item?.id === id) {
          data.cartInfo[index].sum = num;
        }
      })
      let totolNum = 0;
      data?.cartInfo?.map(item=> {
        item?.sum ? totolNum += item?.sum :''
      })
      data.totolNum = totolNum
      props.store.appStore = data
      
      if(totolNum > 0) {
        Taro.setTabBarBadge({
          index: 2,
          text: `${totolNum}`
        })
      }
    }

    function checkClick(e) {
      console.log(e)
      let statusList = checkedList;
      console.log('statusList',statusList)
      statusList.map((item,index)=> {
        item?.id === e?.id ? statusList[index].status = e?.status : ''
      })
      setCheckedList(statusList)
      setTimer(Date.now());
    }

    return (
      <View className="cart">
      {
        // islogin ?
        <>
          {
            dataSource?.cartInfo?.length > 0 ?
            dataSource?.cartInfo?.map((item, index)=> {
              return (
                <View key={item?.id} className='cart-row'>
                <View className='at-row at-row__align--center'>
                    <View className='at-col at-col-1'>
                      <View style={{marginLeft: '-8px'}}>
                        <SingleCheck data={checkedList.find(row=>row?.id === item?.id)} timer={timer} onClick={(e)=> checkClick(e)} />
                      {/* <AtCheckbox options={[{value: item?.id}]} selectedList={checkedList} onChange={(e)=> handleChange(e)} /> */}
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
        // :
        // <View className="cart-login">
        //   <Text>您尚未登录</Text>
        //   <AtButton type='primary' onClick={()=> setIslogin(true)}>登录</AtButton>
        // </View>
      }
    </View>
    )

}



export default inject('store')(observer(Cart))