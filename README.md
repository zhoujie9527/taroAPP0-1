# taroAPP0-1
taroapp开发从0到1系列
# QA
1.
安装tao-ui时,如果出现报错，可以尝试安装taro-ui版本，因为目前taro ui2.+和taro3.+版本不兼容,使用以下命令可解决
npm install taro-ui@3.0.0-alpha.3

2.
AtForm onSubmit完全鸡肋，根本无法和AtButton配合获取表单消息
只能在AtButton中单独写onClick事件，同时所谓的表单数据必须单独存
官方原话：
携带 form 中的数据触发 submit 事件，由于小程序组件化的限制，
onSubmit 事件获得的 event 中的 event.detail.value 始终为空对象，
开发者要获取数据，可以自行在页面的 state 中获取