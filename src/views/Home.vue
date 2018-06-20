<template>
  <div>
    <h2>Home</h2>
    <p>{{msg}}</p>
    <div>
       <ul class="nav nav-tabs">
          <li>
            <!--生成路由链接-->
            <router-link to="/home/news">News </router-link>
          </li>
          <li>
            <router-link to="/home/message">Message </router-link>
          </li>
      </ul>
      <!--显示当前组件-->
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  export default {
    props : {
      msg : String
    }

  }
</script>

<style>

</style>


