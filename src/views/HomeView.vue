<template> 
  <div class="container pt-5" id="app"> 
    <div class="row justify-content-center"> 
      <div class="col-md-8"> 
        <div class="card"> 
          <div class="card-header bg-primary text-white"> 
            <h1 class="text-center">Todo List</h1> 
          </div> 
          <div class="card-body"> 
            <ul class="list-group"> 
              <li v-for="user in users" :key="user.id" class="list-group-item d-flex justify-content-between align-items-center"> 
                
                <router-link :to="{name: 'user-todos',params: { id: user.id}}" class="nav-link">{{ user.name }}</router-link> 
                
                <div class="btn-group" role="group"> 
                  <button type="button" class="btn btn-warning" v-on:click="editUser(user)">Editar</button> 
                  <button type="button" class="btn btn-danger" v-on:click="deleteUser(user)">Deletar</button> 
                </div> 
              </li> 
            </ul> 
            <button class="btn btn-primary btn-block mt-3" v-on:click="addUser()">Adicionar Usuário</button> 
          </div> 
        </div> 
      </div> 
    </div> 
  </div> 
</template>

<script>
export default {
  name: 'HomeView',
  data() {
    return {
      users: [],
    };
  },
  mounted() {
    this.fetchUsers(); // Chamamos a função para carregar os usuários da API
  },
  methods: {
    /** Método para carregar os usuários da API */
    fetchUsers() {
      fetch('http://127.0.0.1:8000/api/users')
        .then((response) => response.json())
        .then((res) => {
          this.users = res.data;
        });
    },
    /** Método para adicionar novo usuário */
    addUser() {
      this.$router.push('/adicionar');
    },
    /**
     * Método para editar o usuário
     * @param {Object} user
     */
    editUser(user) {
      this.$router.push({ name: 'user-edit', params: { id: user.id } });
    },
    /**
     * Método para excluir o usuário
     * @param {Object} user
     */
    deleteUser(user) {
      if (confirm('Deseja realmente excluir o usuário?')) {
        fetch(`http://127.0.0.1:8000/api/users/${user.id}`, { method: 'DELETE' })
          .then((response) => response.json())
          .then(() => {
            this.users.splice(this.users.indexOf(user), 1);
          });
      }
    },
  },
};
</script>