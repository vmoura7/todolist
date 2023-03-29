<template>
  <div class="container">
    <div class="d-flex justify-content-end mt-3">
      <button class="btn btn-secondary me-1" @click="$router.push({ name: 'home' })">Voltar</button>
    </div>
    <div class="mb-4">
      <h1 class="display-4">{{ user.name }}</h1>
      <h6 class="lead">{{ user.email }}</h6>
    </div>
    <UserTodoForm
      :todo="toBeUpdated"
      :user-id="userId"
      @save="onSave"
      @update="onUpdate"
    />
    <div v-if="user.todo && !user.todos.length">
      <div class="alert alert-info mt-3" role="alert">
        Você não possui nenhuma tarefa!
      </div>
    </div>
    <div class="about mt-3">
      <div v-for="todo in user.todos" :key="todo.id" class="card mb-2">
        <div class="card-body">
          <div class="d-flex justify-content-between">
            <div>
              <h5 class="card-title mb-0">{{ todo.title }}</h5>
              <p class="card-text text-muted">{{ todo.description }}</p>
              <div>
                <small class="text-muted">{{ todo.due_date }}</small>
              </div>
              <div class="mt-2">
                <a href="" class="btn btn-secondary" @click.stop.prevent="toBeUpdated = todo">Editar</a>
                <a href="" class="btn btn-danger" @click.stop.prevent="deleteTodo(todo.id)">Excluir</a>
              </div>
            </div>
            <div class="align-self-center">
              <a href="" @click.stop.prevent="toggleDone(todo)">
                <i v-if="todo.is_done" class="fas fa-check-square text-success"></i>
                <i v-else class="far fa-square"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import UserTodoForm from '@/components/UserTodoForm.vue';

export default {
  components: { UserTodoForm },
  data() {
    return {
      user: {},
      toBeUpdated: {},
    };
  },
  computed: {
    userId() {
      return this.$route.params.id;
    },
  },
  mounted() {
    const userId = this.$route.params.id;
    fetch(`http://127.0.0.1:8000/api/users/${userId}`)
      .then((response) => response.json())
      .then((res) => (this.user = res.data));
  },
  methods: {
    onSave(todo) {
      this.user.todos.unshift(todo);
    },
    onUpdate(todo) {
      const todos = this.user.todos;
      const idx = this.user.todos.findIndex((o) => o.id === todo.id);
      todos.splice(idx, 1, todo);
    },
    toggleDone(todo) {
      const url = todo.is_done ? 'undone' : `done`;
      fetch(`http://127.0.0.1:8000/api/todos/${todo.id}/${url}`, {
        method: 'Put',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      })
        .then((response) => response.json())
        .then((res) => {
          todo.is_done = res.data.is_done;
        });
    },
    deleteTodo(todoId) {
      fetch(`http://127.0.0.1:8000/api/todos/${todoId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      }).then(() => {
        const todos = this.user.todos;
        const idx = this.user.todos.findIndex((o) => o.id === todoId);
        todos.splice(idx, 1);
      });
    },
  },
};
</script>