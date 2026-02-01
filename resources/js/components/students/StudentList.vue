<template>
  <div>
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h2><i class="fas fa-users me-2"></i>Students List</h2>
      
    </div>


    <div v-if="error" class="alert alert-danger">
      {{ error }}
    </div>

    
    <div v-else class="card shadow">
      <div class="card-body">
        <div v-if="students.length === 0" class="text-center py-5">
          <i class="fas fa-user-graduate fa-3x text-muted mb-3"></i>
          <h4 class="text-muted">No students found</h4>
          <p class="text-muted">Add your first student to get started!</p>
          <router-link to="/students/create" class="btn btn-primary">
            <i class="fas fa-plus me-1"></i>Add First Student
          </router-link>
        </div>

        <div v-else class="table-responsive">
          <table class="table table-hover">
            <thead class="table-light">
              <tr>
                <th>Student ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Course</th>
                <th>Year/Section</th>
                <th>Gender</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="student in students" :key="student.id">
                <td><strong>{{ student.student_id }}</strong></td>
                <td>{{ student.first_name }} {{ student.last_name }}</td>
                <td>{{ student.email }}</td>
                <td><span class="badge bg-info">{{ student.course }}</span></td>
                <td><span class="badge bg-secondary">{{ student.year_level }}-{{ student.section }}</span></td>
                <td><span class="badge" :class="genderClass(student.gender)">{{ student.gender }}</span></td>
                <td>
                  <div class="btn-group btn-group-sm">
                    <router-link 
                      :to="{ name: 'edit', params: { id: student.id } }" 
                      class="btn btn-warning"
                      title="Edit">
                      <i class="fas fa-edit"></i>
                    </router-link>
                    <button 
                      @click="deleteStudent(student.id)" 
                      class="btn btn-danger"
                      title="Delete"
                      :disabled="deletingId === student.id">
                      <span v-if="deletingId === student.id" class="spinner-border spinner-border-sm"></span>
                      <i v-else class="fas fa-trash"></i>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useStudentStore } from '../../stores/studentStore';

const studentStore = useStudentStore();
const deletingId = ref(null);
const error = ref('');

const students = computed(() => studentStore.students);
const loading = computed(() => studentStore.loading);

onMounted(async () => {
  await fetchStudents();
});

const fetchStudents = async () => {
  error.value = '';
  await studentStore.fetchStudents();
  if (studentStore.error) {
    error.value = studentStore.error;
  }
};

const genderClass = (gender) => {
  switch(gender) {
    case 'Male': return 'bg-primary';
    case 'Female': return 'bg-pink';
    default: return 'bg-secondary';
  }
};

const deleteStudent = async (id) => {
  if (!confirm('Are you sure you want to delete this student? They will be moved to trash.')) {
    return;
  }

  deletingId.value = id;
  error.value = '';

  const response = await studentStore.deleteStudent(id);
  
  if (!response.success) {
    error.value = response.error || 'Failed to delete student';
  } else {
    // Show success message
    alert('Student deleted successfully!');
  }
  
  deletingId.value = null;
};
</script>

<style scoped>
.bg-pink {
  background-color: #e83e8c !important;
  color: white !important;
}
</style>