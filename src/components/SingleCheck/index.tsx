import React, { useEffect, useState } from 'react'
import { View, Image } from '@tarojs/components'
import checkedIcon from './imgs/checked.png'
import unCheckedIcon from './imgs/un-checked.png'

import './index.scss'

export default function SingleCheck(props) {
  const [checked, setChecked] = useState(false);
  const [id, setId] = useState('');

  useEffect(()=> {
    setChecked(props?.data?.status)
    setId(props?.data?.id)
  },[props])

  return (
    <View className="single_check" onClick={()=>props.onClick({id, status: !checked})}>
        <Image
          className='single_check_img'
          src={checked ? checkedIcon : unCheckedIcon}
        />
    </View>
  )
}