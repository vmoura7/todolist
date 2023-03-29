<template>
  <div id="app" class="container">
    
   <router-view/>

  </div>
</template>


<script>

export default {
  data() {
    return {
      users: [],
    };
  }, 

  mounted() {
    fetch('http://127.0.0.1:8000/api/users')
      .then(response => response.json())
      .then((res) => {
        this.users = res.data;
      });
  },
}
</script>
