<template>
    <div class="todo-container">
      <div class="todo-wrap">
        <!-- <TodoHeader :addTodo="addTodo" /> -->
        <!-- <TodoHeader @addTodo = "addTodo" />  给TodoHeader 标签对象绑定addTodo事件监听 -->
        <TodoHeader ref="header" />
        <TodoList :todos="todos" />
        <TodoFooter>
          <input type="checkbox" v-model="isAllCheck" slot="checkAll" />
          <span slot="count">已完成{{completeSize}}  / 全部{{todos.length}}</span>
          <button class="btn btn-danger" @click="deleteCompleteTodos" v-show="completeSize" slot="delete">清除已完成任务</button>
        </TodoFooter>
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
  import storageUtil  from './util/storageUtil.js'
  export default {
    components : {
      TodoHeader,
      TodoList,
      TodoFooter
    },
    data () {
      return {
        // 从localStorage 读取todos
        // todos : JSON.parse(window.localStorage.getItem('todos_key') || '[ ]')
        todos : storageUtil.readTodos()

        // todos : [
        //   {title : '吃饭', complete : false},
        //   {title : '睡觉', complete : true},
        //   {title : 'coding', complete : false}
        // ]
      }
    },
    computed : {
      completeSize () {
        return  this.todos.reduce( (preTotal, todo) => preTotal + (todo.complete ? 1 : 0),0)
      },
      isAllCheck : {
        get () {
          return this.completeSize === this.todos.length && this.completeSize >0
        },
        set (value) { // value是当前checkbox最新的值
          this.selectAllTodos(value)
        }
      }
    },
    mounted () {  //执行异步代码
      // 给<TodoHeader />绑定addTodo事件监听
      // this.$on('addTodo', this.addTodo ) //  给App绑定的事件监听，不对
      this.$refs.header.$on('addTodo', this.addTodo)

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
         /* handler : function (value) {
          // 将todos的最新的值得json数据，保存到localStorage
          // window.localStorage.setItem('todos_key', JSON.stringify(value))
          storageUtil.saveTodos(value)
        } */
        handler : storageUtil.saveTodos
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

