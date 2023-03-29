<template>
    <div>
      <h2>Excluir Usuário</h2>
      <p>Tem certeza de que deseja excluir o usuário "{{ user.name }}"?</p>
      <button class="btn btn-danger" @click="deleteUser">Sim</button>
      <button class="btn btn-secondary" @click="$router.push({ name: 'home' })">Não</button>
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
        .then((res) => {
          this.user = res.data;
        });
    },
    methods: {
      deleteUser() {
        fetch(`http://127.0.0.1:8000/api/users/${this.$route.params.id}`, {
          method: 'DELETE',
        })
          .then((response) => response.json())
          .then(() => {
            this.$router.push({ name: 'home' });
          })
          .catch((error) => console.error(error));
      },
    },
  };
  </script>