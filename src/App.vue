<template>
    <div class="todo-container">
      <div class="todo-wrap">
        <!-- <TodoHeader :addTodo="addTodo" /> -->
        <!-- <TodoHeader @addTodo = "addTodo" />  给TodoHeader 标签对象绑定addTodo事件监听 -->
        <TodoHeader ref="header" />
        <TodoList :todos="todos" />
        <TodoFooter :todos="todos" :deleteCompleteTodos="deleteCompleteTodos" :selectAllTodos="selectAllTodos" />
      </div>
   </div>
</template>

<!--
  绑定事件监听      ----订阅消息
  触发事件              ----发布信息

-->

<script>
  import PubSub from 'pubsub-js'
  import TodoHeader from './components/TodoHeader.vue'
  import TodoList from './components/TodoList.vue'
  import TodoFooter from './components/TodoFooter.vue'
  export default {
    components : {
      TodoHeader,
      TodoList,
      TodoFooter
    },
    data () {
      return {
        // 从localStorage 读取todos
        todos : JSON.parse(window.localStorage.getItem('todos_key') || '[ ]')

        // todos : [
        //   {title : '吃饭', complete : false},
        //   {title : '睡觉', complete : true},
        //   {title : 'coding', complete : false}
        // ]
      }
    },
    mounted () {  //执行异步代码
      // 给<TodoHeader />绑定addTodo事件监听
      // this.$on('addTodo', this.addTodo ) //  给App绑定的事件监听，不对
      // this.$refs.header.$on('addTodo', this.addTodo)

      // 订阅消息
      PubSub.subscribe('deleteTodo',  (msg, index) => {
        this.deleteTodo(index)
      })

    },
    methods : {
      addTodo (todo) {
        this.todos.unshift(todo)
      },
      deleteTodo (index) {
        this.todos.splice(index, 1)
      },
      //删除所有选中的todo
      deleteCompleteTodos () {
        this.todos = this.todos.filter( todo => !todo.complete)
      },
      // 全选或全不选
      selectAllTodos (check) {
        this.todos.forEach( todo => todo.complete =check)
      }

    },
    watch : {  // 监视
      todos : {
        deep : true,  //深度监视
        handler : function (value) {
          // 将todos的最新的值得json数据，保存到localStorage
          window.localStorage.setItem('todos_key', JSON.stringify(value))
        }
      }

    }

  }

</script>

<style>
  /*app*/
.todo-container {
  width: 600px;
  margin: 0 auto;
}
.todo-container .todo-wrap {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

</style>

