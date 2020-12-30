import React, { useState } from 'react'
import { View, Button, Text, Image } from '@tarojs/components'
import { observer, inject } from 'mobx-react'
import { AtButton } from 'taro-ui'
import './index.scss'

function Cart(props) {
    const [islogin, setIslogin] = useState(false);

    return (
      <View className="cart">
      {
        islogin ?
        <>
          {
            props?.store?.appStore?.cartInfo?.map((item, index)=> {
              return <View className='cart-row'>
              <View className='at-row at-row__align--center'>
                  <View className='at-col at-col-1'>
                    {index+1}
                  </View>
                  <View className='at-col at-col-3'>
                    <Image className="cart-img" src={item?.categoryItem?.listPicUrl} alt='' />
                  </View>
                  <View className='at-col at-col-8 at-col--wrap'>
                    <View>{item?.categoryItem?.name || '--'}</View>
                  </View>
              </View>
              </View>
            })
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