<template>
<div>
  <!-- 路由组件中读取请求参数params -->
  <!-- <p>ID : {{$route.params.id}}</p> -->
    <!-- 路由组件中读取请求参数query -->
  <p>ID : {{$route.query.id}}</p>
  <ul>
    <li>id : {{messageDetail.id}} </li>
    <li>title : {{messageDetail.title}}</li>
    <li>content : {{messageDetail.content}} </li>
  </ul>
</div>
</template>

<script>
  export default {
    data ( ) {
      return {
        messageDetail : {}
      }
    },
    mounted () {
      setTimeout(() => {
       const allMessageDetail = [
          {
            id : 1,
            title : 'message01',
            content : 'message01 content'
          },
          {
            id : 3,
            title : 'message03',
            content : 'message03 content'
          },
          {
            id : 5,
            title : 'message05',
            content : 'message05 content'
          }
       ]

       this.allMessageDetail = allMessageDetail
      //  const id = this.$route.params.id*1
       const id = this.$route.query.id*1
       this.messageDetail = allMessageDetail.find(detail => detail.id ===id)
      }, 1000);
    },

    watch : {
      $route : function (value) {   //  路由路径(params)发生了改变
        // const id = value.params.id*1
        const id = this.$route.query.id*1
        this.messageDetail = this.allMessageDetail.find( detail => detail.id ===id)

      }
    }

  }

</script>

<style>

</style>

