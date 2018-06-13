/**
 * 入口JS : 创建Vue实例
 */
import Vue from 'vue'
import App from './App.vue'  //1. 引入组件App

new Vue({
  el : '#app',
  // 2. 映射组件标签
  components : {
    App
  },
  // 3. 使用组件标签
  template : '<App />'

})
