import React, { useState } from 'react'
import { View, Text } from '@tarojs/components'
import { PostCard, PostForm } from '../../components'
import { AtFab, AtFloatLayout, AtMessage } from 'taro-ui'
import Taro from '@tarojs/taro'
import './index.scss'

export default function Index() {
  const [posts, setPosts] = useState([
    {
      title: 'title测试',
      content: '内容测试',
    },
  ])
  const [formTitle, setFormTitle] = useState('')
  const [formContent, setFormContent] = useState('')
  const [isOpened, setIsOpened] = useState(false)

  function handleSubmit(e) {
    console.log('handleSubmit', formTitle, formTitle)
    e.preventDefault()

    const newPosts = posts.concat({ title: formTitle, content: formContent })
    setPosts(newPosts)
    setFormTitle('')
    setFormContent('')
    setIsOpened(false)

    Taro.atMessage({
      message: '发表文章成功',
      type: 'success',
    })

  }

  return (
    <View className="index">
      <AtMessage />
      {posts.map((post, index) => (
        <PostCard key={index} title={post.title} content={post.content} isList />
      ))}
      <AtFloatLayout
        isOpened={isOpened}
        title="发表新文章"
        onClose={() => setIsOpened(false)}
      >
        <PostForm
          formTitle={formTitle}
          formContent={formContent}
          handleSubmit={e => handleSubmit(e)}
          handleTitleInput={e => setFormTitle(e)}
          handleContentInput={e => setFormContent(e)}
        />
      </AtFloatLayout>
      <View className="post-button">
        <AtFab onClick={() => setIsOpened(true)}>
          <Text className="at-fab__icon at-icon at-icon-edit"></Text>
        </AtFab>
      </View>
      {/* <PostForm
        formTitle={formTitle}
        formContent={formContent}
        handleSubmit={e => handleSubmit(e)}
        handleTitleInput={e => setFormTitle(e.target.value)}
        handleContentInput={e => setFormContent(e.target.value)}
      /> */}
    </View>
  )
}

// export default class Index extends Component {
//   state = {
//     posts: [
//       {
//         title: '默认标题',
//         content: '默认内容',
//       },
//     ],
//     formTitle: '',
//     formContent: '',
//   }

//   componentWillMount () { }

//   componentDidMount () { }

//   componentWillUnmount () { }

//   componentDidShow () { }

//   componentDidHide () { }

//   handleSubmit(e) {
//     e.preventDefault()

//     const { formTitle: title, formContent: content } = this.state
//     const newPosts = this.state.posts.concat({ title, content })

//     this.setState({
//       posts: newPosts,
//       formTitle: '',
//       formContent: '',
//     })
//   }

//   handleTitleInput(e) {
//     this.setState({
//       formTitle: e.target.value,
//     })
//   }

//   handleContentInput(e) {
//     this.setState({
//       formContent: e.target.value,
//     })
//   }

//   render () {
//     return (
//       <View className='index'>
//         <Text>test</Text>
//          {this.state.posts.map((post, index) => (
//           <PostCard key={index} title={post.title} content={post.content} />
//         ))}
//         <PostForm
//           formTitle={this.state.formTitle}
//           formContent={this.state.formContent}
//           handleSubmit={e => this.handleSubmit(e)}
//           handleTitleInput={e => this.handleTitleInput(e)}
//           handleContentInput={e => this.handleContentInput(e)}
//         />
//       </View>
//     )
//   }
// }
