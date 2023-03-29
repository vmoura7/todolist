<template>
  <div class="mt-3">
    <h2>Adicionar Usuário</h2>
    <form @submit.prevent="addUser">
      <div class="form-group">
        <label for="name">Nome</label>
        <input type="text" class="form-control" id="name" v-model="name" required>
      </div>
      <div class="form-group">
        <label for="email">Email</label>
        <input type="email" class="form-control" id="email" v-model="email" required>
      </div>
      <div class="form-group">
        <label for="password">Senha</label>
        <input type="password" class="form-control" id="password" v-model="password" required>
      </div>
      <div class="mt-2">
        <button type="submit" class="btn btn-primary">Salvar</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: '',
      email: '',
      password: '',
    };
  },
  methods: {
    addUser() {
      const data = {
        name: this.name,
        email: this.email,
        password: this.password,
      };
      fetch('http://127.0.0.1:8000/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
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