<template>
  <div>
    <ul>
      <li v-for="(message, index) in messages" :key="message.id">
        <!-- 向路由组件传递数据 方法一：路由路径携带参数（params/ query） -->
        <router-link :to="`/home/message/detail/${message.id}`">{{message.title}}</router-link>
        <!-- 向路由组件传递数据  方法二：路由路径携带query参数 -->
        <!-- <router-link :to="`/home/message/detail?id=${message.id}`">{{message.title}}</router-link> -->
        <button @click="pushShow(message.id)">push查看</button>
        <button @click="replaceShow(message.id)">replace查看</button>
      </li>
    </ul>
    <!-- $router.back() / $router.go(-1)：请求（返回）上一个记录路由 -->
    <button @click="$router.back()">回退</button>
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
    },
    methods : {
      pushShow (id) {
        this.$router.push(`/home/message/detail/${id}`)     //  this.$router.push(path)：相当于点击路由链接(可以返回到当前路由界面)
      },
      replaceShow (id) {
        this.$router.replace(`/home/message/detail/${id}`)    //  this.$router.replace(path)：用新路由替换当前路由（不可以返回到当前路由界面）
      }
    }

  }

</script>

<style>

</style>

