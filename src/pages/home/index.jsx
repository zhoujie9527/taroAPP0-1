import { View, Text, Image } from '@tarojs/components';
import React, { useEffect, useState } from 'react';
import Taro from '@tarojs/taro';
import { Swiper, SwiperItem } from '@tarojs/components'
import { AtSearchBar } from 'taro-ui';
import { HomeApi } from '@utils/api'
import './index.scss'

const Home = () => {
    const [searchCount, setSearchCount] = useState(2000);
    const [scrollData, setScrollData] = useState([]);

    useEffect(()=> {
        Taro.request({
            url: HomeApi,
            method: 'GET'
        }).then((res)=> {
            console.log('res', res)
            setScrollData(res.data.data)
        }).catch(err=> {
            console.log('err', err)
        })
    },[]);
    
    return(
        <View  className='home'>
            <View className='home_search'>
                <AtSearchBar placeholder={`搜索商品，共${searchCount}款产品`} clear />
            </View>
            <View className='home_scroll'>
                <Swiper
                    className='home_scroll_swiper'
                    indicatorColor='#999'
                    indicatorActiveColor='#333'
                    // vertical
                    circular
                    indicatorDots
                    autoplay
                >
                    {
                        scrollData?.hotStyleList?.hotStyleItemList.map(item=> {
                            return <SwiperItem>
                            <View className='home_scroll_swiper-img'>
                                <Image src={item.picUrl} alt="" />
                            </View>
                            </SwiperItem>
                        })
                    }
                </Swiper>
            </View>
        </View>
    )
}

export default Home;