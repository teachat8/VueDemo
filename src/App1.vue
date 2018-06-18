<template>
  <div>
    <div  v-if="!repoUrl">loading</div>
    <div  v-else>most star repo is <a :href="repoUrl">{{repoName}}</a></div>
  </div>
</template>

<script>
  //  axios 在哪使用，就在哪引入
  import axios  from 'axios'
  export default {
    data () {
      return {
        repoUrl : '',
        repoName : ''
      }
    },

    mounted ()  {
      //  发ajax请求获取数据
      const url = 'https://api.github.com/search/repositories?q=v&sort=stars'
      // this.$http.get(url).then(
      //   //  成功的回调函数
      //   response => {
      //     const result  = response.data
      //     //  得到最受欢迎的repo
      //     const mostRepo = result.items[0]
      //     this.repoUrl = mostRepo.html_url
      //     this.repoName = mostRepo.name
      //   },
      //   //  失败的回调函数
      //     response => {
      //       alert('请求失败')
      //     }
      // )

      //  使用 axios 发送ajax请求
      axios.get(url).then(
        //  成功的回调函数
        response => {
          const result  = response.data
          //  得到最受欢迎的repo
          const mostRepo = result.items[0]
          this.repoUrl = mostRepo.html_url
          this.repoName = mostRepo.name
        }
      ).catch (   //  失败的回调函数
        error =>  {
          alert('请求失败')
        }

      )


    }

  }
</script>

<style>

</style>



