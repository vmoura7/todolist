<template>
    <div>
      <div class="d-flex justify-content-end">
        <button class="btn btn-secondary mt-2" @click="$router.push({ name: 'user-todos', params: { id: user.id } })">Voltar</button>
      </div>
      <h2>Editar usuário</h2>
      <form @submit.prevent="updateUser">
        <div class="form-group">
          <label for="name">Nome:</label>
          <input type="text" class="form-control" id="name" v-model="user.name" required>
        </div>
        <div class="form-group">
          <label for="email">E-mail:</label>
          <input type="email" class="form-control" id="email" v-model="user.email" required>
        </div>
        <div class="form-group mt-2">
          <button type="submit" class="btn btn-primary">Salvar</button>
        </div>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        user: {},
      };
    },
    created() {
      fetch(`http://127.0.0.1:8000/api/users/${this.$route.params.id}`)
        .then((response) => response.json())
        .then((data) => {
          this.user = data.data;
        });
    },
    methods: {
      updateUser() {
        fetch(`http://127.0.0.1:8000/api/users/${this.user.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(this.user),
        })
          .then((response) => response.json())
          .then(() => {
            this.$router.push({ name: 'user-todos', params: { id: this.user.id } });
          });
      },
    },
  };
  </script>