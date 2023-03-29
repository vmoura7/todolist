import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import UserAdd from '../views/UserAdd.vue';
import UserEdit from '../views/UserEdit.vue';
import UserDelete from '../views/UserDelete.vue';
import UserTodos from '../views/UserTodos.vue';

const routes = [
   {
      path: '/',
      name: 'home',
      component: HomeView,
   },
   {
      path: '/adicionar',
      name: 'user-add',
      component: UserAdd,
   },
   {
      path: '/editar/:id',
      name: 'user-edit',
      component: UserEdit,
      props: true,
   },
   {
      path: '/excluir/:id',
      name: 'user-delete',
      component: UserDelete,
      props: true,
   },
   {
      path: '/usuarios/:id',
      name: 'user-todos',
      component: UserTodos,
      props: true,
   },
];

const router = createRouter({
   history: createWebHistory(),
   routes,
});

export default router;