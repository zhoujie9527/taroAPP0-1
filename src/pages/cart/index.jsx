import React, { Component } from 'react'
import { View, Button, Text, Image } from '@tarojs/components'
import { observer, inject } from 'mobx-react'
import { AtButton } from 'taro-ui'

import './index.scss'


@inject('store')
@observer
class Cart extends Component {
  state = {
    islogin: false
  }

  componentWillMount () { }

  componentDidMount () { 
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    const { appStore } = this.props.store
    const { islogin } = this.state;
    return (
      <View className="cart">
      {
        islogin ?
        <>
          {
            appStore.cartInfo?.map((item, index)=> {
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
          <AtButton type='primary' onClick={()=> this.setState({ islogin: true })}>登录</AtButton>
        </View>
      }
    </View>
    )
  }
}

export default Cart