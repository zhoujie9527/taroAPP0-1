import { View, Text, Image, ScrollView } from '@tarojs/components';
import React, { useEffect, useState } from 'react';
import Taro from '@tarojs/taro';
import { Swiper, SwiperItem } from '@tarojs/components'
import { AtMessage, AtSearchBar } from 'taro-ui';
import { HomeApi, HomeScrollApi } from '@utils/api'
import { getWindowHeight } from '@utils/style'
import fetch from '@utils/request'
import './index.scss'

const SCROLL_SIZE = 20

const Home = () => {
    const [searchCount, setSearchCount] = useState(2000);
    const [homeData, setHomeData] = useState([]);
    const [scrollData, setScrollData] = useState([]);
    const [lastItem, setLastItem] = useState(0);
    const [hasMore, setHasMore] = useState(true);

    useEffect(()=> {
        fetch({ url: HomeApi, method: 'GET' }).then((res)=> {
            console.log('res', res)
            setHomeData(res)
        }).catch(err=> {
            console.log('err', err)
        })

        getHomeScroll();
    },[]);

    async function getHomeScroll() {
        let url = HomeScrollApi + '?' + `size=${SCROLL_SIZE}` + '&' + `lastItemId=${lastItem}`;
        console.log('url',url)
        fetch({ url: url, method: 'GET' }).then((res)=> {
            let list = scrollData.concat(res?.rcmdItemList)
            setScrollData(list);
            setLastItem(res?.rcmdItemList[res.rcmdItemList.length - 1]?.id)
            setHasMore(res?.hasMore)
        }).catch(err=> {
            console.log('err', err)
        })
    }

    function showDetail(params) {
        console.log('showDetail', params)
        // Taro.atMessage({
        //     message: '功能开发中...',
        //     type: 'info',
        //   })
        Taro.navigateTo({
            url: `/pages/post/post?data=${JSON.stringify(params)}`,
          })
    }
    
    return(
        <View  className='home'>
            <AtMessage />
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
                        homeData?.focus?.map(item=> {
                            return <SwiperItem>
                            <View className='home_scroll_swiper-img'>
                                <Image style={{height: '100%'}} src={item.img} alt="" />
                            </View>
                            </SwiperItem>
                        })
                    }
                </Swiper>
            </View>
            <View className='home_scrollTitle'>热门推荐</View>
            <ScrollView
                scrollY
                className='home_scrollY'
                onScrollToLower={()=>getHomeScroll()}
                style={{ height: getWindowHeight() }}
            >
                <View  className='home_scrollView'>
                <View className='at-row at-row--wrap'>
                {
                    scrollData?.filter(item => item?.type === 1).map((data, index) => {
                        return <View className='at-col at-col-6' onClick={()=>showDetail(data)}>
                        <Image className='home_scrollView-img' src={data?.categoryItem?.listPicUrl} alt='--' />
                        <View className='home_scrollView-price'>
                            <Text>￥{data?.categoryItem?.retailPrice}</Text>
                        </View>
                        </View>
                    })
                }
                
                </View>
                </View>
            </ScrollView>
            {!hasMore &&
            <View className='home_nomore'>
              <Text>更多内容，敬请期待</Text>
            </View>
            }
        </View>
    )
}

export default Home;