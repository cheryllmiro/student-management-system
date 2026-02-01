<template>
  <div>
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h2><i class="fas fa-trash me-2"></i>Deleted Students</h2>
      <router-link to="/" class="btn btn-outline-primary">
        <i class="fas fa-arrow-left me-1"></i>Back to Students
      </router-link>
    </div>

    <div class="card shadow">
      <div class="card-body">
        <div v-if="deletedStudents.length === 0" class="text-center py-5">
          <i class="fas fa-trash-alt fa-3x text-muted mb-3"></i>
          <h4 class="text-muted">No deleted students</h4>
          <p class="text-muted">Trash is empty!</p>
        </div>

        <div v-else class="table-responsive">
          <table class="table table-hover">
            <thead class="table-light">
              <tr>
                <th>Student ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Course</th>
                <th>Deleted At</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="student in deletedStudents" :key="student.id">
                <td><strong>{{ student.student_id }}</strong></td>
                <td>{{ student.first_name }} {{ student.last_name }}</td>
                <td>{{ student.email }}</td>
                <td><span class="badge bg-info">{{ student.course }}</span></td>
                <td>{{ formatDate(student.deleted_at) }}</td>
                <td>
                  <div class="btn-group btn-group-sm">
                    <button @click="restoreStudent(student.id)" class="btn btn-success" title="Restore">
                      <i class="fas fa-trash-restore"></i> Restore
                    </button>
                    <button @click="permanentDelete(student.id)" class="btn btn-danger" title="Delete Permanently">
                      <i class="fas fa-times"></i> Delete
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
import { ref, onMounted } from 'vue';
import axios from 'axios';

const deletedStudents = ref([]);

onMounted(async () => {
  await fetchDeletedStudents();
});

const fetchDeletedStudents = async () => {
  try {
    const response = await axios.get('/api/students/deleted/list');
    deletedStudents.value = response.data;
  } catch (error) {
    console.error('Error fetching deleted students:', error);
    alert('Failed to load deleted students');
  }
};

const formatDate = (dateString) => {
  if (!dateString) return '';
  return new Date(dateString).toLocaleString();
};

const restoreStudent = async (id) => {
  if (confirm('Restore this student?')) {
    try {
      await axios.post(`/api/students/${id}/restore`);
      deletedStudents.value = deletedStudents.value.filter(student => student.id !== id);
      alert('Student restored successfully!');
    } catch (error) {
      console.error('Error restoring student:', error);
      alert('Failed to restore student');
    }
  }
};

const permanentDelete = async (id) => {
  if (confirm('Permanently delete this student? This cannot be undone!')) {
    try {
      await axios.delete(`/api/students/${id}/force-delete`);
      deletedStudents.value = deletedStudents.value.filter(student => student.id !== id);
      alert('Student permanently deleted!');
    } catch (error) {
      console.error('Error deleting student:', error);
      alert('Failed to delete student');
    }
  }
};
</script>