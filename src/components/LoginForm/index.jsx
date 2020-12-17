import React, { useState } from 'react'
import Taro from '@tarojs/taro'
import { View, Form, Input } from '@tarojs/components'
import { AtButton, AtImagePicker } from 'taro-ui'

import './index.scss'
import { useEffect } from 'react'

export default function LoginForm(props) {
  const [showAddBtn, setShowAddBtn] = useState(true)

  useEffect(()=> {
      if(props.files.length === 0) {
        setShowAddBtn(true)
      }
  },[props.files]);

  function onChange(files) {
    if (files.length > 0) {
      setShowAddBtn(false)
    }

    props.handleFilesSelect(files)
  }

  function onImageClick() {
    Taro.previewImage({
      urls: [props.files[0].url],
    })
  }

  return (
    <View className="post-form">
      <Form>
        <View className="login-box">
          {/* <View className="avatar-selector">
            <AtImagePicker
              length={1}
              mode="scaleToFill"
              count={1}
              files={props.files}
              showAddBtn={showAddBtn}
              onImageClick={onImageClick}
              onChange={onChange}
            />
          </View> */}
          <AtImagePicker
              length={1}
              mode="scaleToFill"
              count={1}
              files={props.files}
              showAddBtn={showAddBtn}
              onImageClick={onImageClick}
              onChange={onChange}
            />
          <Input
            className="input-nickName"
            type="text"
            placeholder="点击输入昵称"
            value={props.formNickName}
            onInput={(e)=>props.handleNickNameInput(e)}
          />
          <AtButton onClick={(e)=> {props.handleSubmit(e)}} type="primary">
            登录
          </AtButton>
        </View>
      </Form>
    </View>
  )
}