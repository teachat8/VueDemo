<template>
  <div>
    <ul>
      <li v-for="(message, index) in messages" :key="message.id">
        <!-- 向路由组件传递数据 方法一：路由路径携带参数（params/ query） -->
        <!-- <router-link :to="`/home/message/detail/${message.id}`">{{message.title}}</router-link> -->
        <!-- 向路由组件传递数据  方法二：路由路径携带query参数 -->
        <router-link :to="`/home/message/detail?id=${message.id}`">{{message.title}}</router-link>
      </li>
    </ul>
    <hr>
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        messages : ''
      }
    },

    mounted () {
      // 模拟ajax请求从后台获取数据
      setTimeout( ( ) => {
        const messages = [
          {
            id : 1,
            title : 'message01'
          },
          {
            id : 3,
            title : 'message03'
          },
          {
            id : 5,
            title : 'message05'
          }
        ]
        this.messages = messages
      },1000)
    }

  }

</script>

<style>

</style>

