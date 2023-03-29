<template>
    <div class="my-5">
      <button v-if="!showForm" @click="showForm = true" class="btn btn-primary mb-3">
        Adicionar Tarefa
      </button>
      <form v-if="showForm" @submit.stop.prevent="submit">
        <div class="form-group mb-2">
          <label for="title" class="form-label">Titulo</label>
          <input v-model="title" id="title" type="text" class="form-control" placeholder="Insira o titulo">
        </div>
        <div class="form-group">
          <label for="description" class="form-label">Descrição</label>
          <textarea v-model="description" id="description" type="text" class="form-control"
            placeholder="Insira a descrição"></textarea>
        </div>
        <div class="row">
          <div class="col-md-6">
            <div class="form-group mb-2 mt-2">
              <label for="date" class="form-label">Data</label>
              <input v-model="dueDate" id="date" type="date" class="form-control">
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-group mb-2 mt-3">
              <div class="form-check">
                <input v-model="isDone" class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
                <label class="form-check-label" for="flexCheckDefault"> Finalizado</label>
              </div>
            </div>
          </div>
        </div>
        <button type="submit" class="btn btn-primary">Enviar</button>
        <button type="button" class="btn btn-secondary" @click="cancel">Cancelar</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    name: 'UserTodoForm',
  
    props: {
      todo: {
        type: Object,
        default: () => ({}),
      },
      userId: {
        type: [String, Number],
        default: null,
      },
    },
  
    data() {
      return {
        id: null,
        title: '',
        description: '',
        dueDate: '',
        isDone: true,
        showForm: false,
      };
    },
  
    watch: {
      todo(vl) {
        this.id = vl.id;
        this.title = vl.title;
        this.description = vl.description;
        this.dueDate = vl.due_date;
        this.isDone = vl.is_done;
        this.showForm = true;
      },
    },
  
    methods: {
      submit() {
        const payload = {
          title: this.title,
          description: this.description,
          due_date: this.dueDate,
          is_done: this.isDone,
        };
        if (this.id) {
          this.updateTodo(payload);
        } else {
          this.storeTodo(payload);
        }
      },
  
      storeTodo(payload) {
        fetch(`http://127.0.0.1:8000/api/users/${this.userId}/todos`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify(payload),
        })
          .then(response => response.json())
          .then(res => {
            this.$emit('save', res.data);
  
            this.resetForm();
          });
      },
  
      updateTodo(payload) {
        fetch(`http://127.0.0.1:8000/api/todos/${this.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify(payload),
        })
          .then(response => response.json())
          .then(res => {
            this.$emit('update', res.data);
  
            this.resetForm();
          });
      },
  
      resetForm() {
        this.title = '';
        this.description = '';
        this.dueDate = '';
        this.isDone = true;
        this.showForm = false;
      },
  
      cancel() {
        this.resetForm();
        this.$emit('cancel');
      },
    },
  };
  </script>