import { createRouter, createWebHistory } from 'vue-router';

// Use static imports instead of dynamic for debugging
import StudentList from '../components/students/StudentList.vue';
import StudentForm from '../components/students/StudentForm.vue';
import DeletedStudents from '../components/students/DeletedStudents.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: StudentList,
    meta: { title: 'Students List' }
  },
  {
    path: '/students/create',
    name: 'create',
    component: StudentForm,
    meta: { title: 'Add Student' }
  },
  {
    path: '/students/:id/edit',
    name: 'edit',
    component: StudentForm,
    props: true,
    meta: { title: 'Edit Student' }
  },
  {
    path: '/students/deleted',
    name: 'deleted',
    component: DeletedStudents,
    meta: { title: 'Deleted Students' }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// Debug logging
router.beforeEach((to, from, next) => {
  console.log(`Navigating from ${from.path} to ${to.path}`);
  document.title = to.meta.title ? `${to.meta.title} - Student Management` : 'Student Management';
  next();
});

router.afterEach((to, from) => {
  console.log(`Navigation complete to ${to.path}`);
});

export default router;